/* eslint-disable no-multi-spaces */
import React from 'react';
import Reviews from './Reviews.jsx';
import $ from 'jquery';
//import styled from 'styled-components';
const styled = window.styled;
import RecentlyPosted from './RecentlyPosted.jsx';
import FilterComponent from './FilterComponent.jsx';
import ModalRoot from './ModalRoot.jsx';

/**
 * The ReviewsModule is the starting point for 3 separate components
 * 1. Filters: dynamically display available filters pulled from BE
 * 2. Reviews: reviews based on selected filter values
 * 3. Recent reviews: most recent 10 reviews based on selected date range
 */
class ReviewsModule extends React.Component {
  constructor(props) {
    super(props);
    this.game_id = 1;
    this.state = {
      filters: [],          // List of all available filters
      activeFilters: {},    // Active filters and their selected options
      filterSearch: {
        game_id: this.game_id
      },     // Filter object to send to the BE for query
      count: 0,             // Number of results matching filter
      reviews: [],          // Array of review objects given filter
      recentReviews: [],    // Array of most recent reviews given filter
      order: 'helpful',     // The order of the reviews - helpful, recent, funny
    };
    this.updateReviewState = this.updateReviewState.bind(this);
  }

  componentDidMount() {
    this.getReviews(this.updateReviewState);
    this.getFilters((err, data) => {
      if (err) { return console.error('Error getting filters'); }
      this.setState({
        filters: data
      });
    });
  }

  /* MODELS */
  /**
   * Callback function to be invoked on received data.
   * We call a backend function to provide count and array separate from each other
   * since it's likely there will be pagination with large amounts of data.
   * @param {Array} data - an array of Review objects
   */
  updateReviewState(data) {
    let reviews = data.rows;
    let count = data.count;
    let recentReviews = reviews.slice().sort((a, b) => {
      return new Date(b.review_date) - new Date(a.review_date);
    }).slice(0, 10);
    this.setState({ reviews, recentReviews, count });
  }

  /**
   * Set the review filters based on user input, then call an API to retrieve reviews with given filters.
   * An empty object means no filters selected. 
   * @param {Object} e 
   * @param {String} filter - e.g. "Recommended"
   * @param {Object} option - e.g. "{optionId: true, optionName: 'Recommended'}"
   */
  setFilters(e, filter, option) {
    let activeFilters = Object.assign(this.state.activeFilters);
    let filterSearch = Object.assign(this.state.filterSearch);

    if (typeof option.optionId === 'object' && Object.keys(option.optionId).length === 0) {
      delete activeFilters[filter];
      delete filterSearch[filter];
    } else {
      activeFilters[filter] = option;
      filterSearch[filter] = option.optionId;
    }
    this.setState({activeFilters, filterSearch});
    this.getReviews(this.updateReviewState);
  }

  /**
   * Update sort order in the component state, then call an API to retrieve reviews with given order.
   * @param {Object} e - an event object
   */
  setSort(e) {
    const order = e.target.value;
    this.setState({order}, () => {
      this.getReviews(this.updateReviewState);
    });
  }

  /* CONTROLLERS */
  /**
   * Get reviews using an API, passing the component's current filter and order states
   * Execute callback on received data (array)
   * @param {Function} callback 
   * @return {Array}
   */
  getReviews(callback) {
    const filters = this.state.filterSearch;
    const order = this.state.order;

    $.ajax({
      url: '/reviews',
      method: 'GET',
      data: {where: filters, order: order},
      success: result => callback(result),
      error: () => console.error('Couldn\'t get reviews')
    });
  }

  /**
   * Call an API to retrieve the list of available filters and respective options
   * e.g. Filter: language, options: Arabic, French, etc
   * Invoke callback on filter object
   * @param {Function} callback 
   * @return {Object}
   */
  getFilters(callback) {
    const game_id = this.game_id;

    $.ajax({
      url: '/reviews/filters',
      method: 'GET',
      data: { game_id },
      success: (data) => callback(null, data), 
      error: (err) => console.error('Error getting filter', err)
    });
  }

  /* VIEWS */
  render() {
    return (
      <ModuleContainer className='ModuleContainer'>
        <FilterComponent sort={this.setSort.bind(this)} setFilters={this.setFilters.bind(this)} activeFilters={this.state.activeFilters} 
          filters={this.state.filters} count={this.state.count}/>
        <ReviewsContainer className='ReviewsContainer'>
          <Reviews sort={this.state.order} reviews={this.state.reviews}/>
          <RecentlyPosted reviews={this.state.recentReviews}/>
        </ReviewsContainer>
      </ModuleContainer>
    );
  }
}

/*background: #1a2738;*/
const ModuleContainer = styled.div`
  background: #1a2738;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  max-width: 940px;
  width: auto;
  height: auto;

`;

const ReviewsContainer = styled.div`
  width: inherit;
  background: red;
  display: block;
  background: inherit;
  @media only screen and (min-width: 768px) {
    width: auto;
    display: flex;
  }
`;

ModuleContainer.displayName = 'ModuleContainer';

export default ReviewsModule;