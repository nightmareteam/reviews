/* eslint-disable camelcase */
import React from 'react';
//import styled from 'styled-components';
const styled = window.styled;
import RatingButtons from './RatingButtons.jsx';
import $ from 'jquery';
import CommentModal from './CommentModal.jsx';

/**
 * Class representing a review rating
 * @extends React.Component
 */
class ReviewRating extends React.Component {
  /**
   * Initialize all review rating values (yes/no/funny) to false.
   * These values will be updated via user interaction.
   * Initialize modal display to false. The modal is displayed when
   * user clicks to view comments.
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: {
        yes: false,
        no: false, 
        funny: false
      },
      displayModal: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  /**
   * This function toggles the respective review rating to true, and others to false.
   * It then makes an API call to update the values in the backend.
   * @param {*} e - an event object
   * @param {*} val - the selected review rating - yes/no/funny
   */
  updateHelpfulness(e, val) {
    e.preventDefault();
    let status = !this.state.helpfulness[val];
    let helpfulness = {
      yes: false,
      no: false, 
      funny: false
    };
    helpfulness[val] = status;

    $.ajax({
      url: '/review/vote',
      method: 'POST',
      data: {
        // eslint-disable-next-line camelcase
        post_id: this.props.post_id,
        helpfulness: helpfulness
      },
      success: () => {
        //console.log('PostID ' + this.props.post_id + JSON.stringify(helpfulness));
        this.setState({ helpfulness });
      },
      error: () => console.error('Couldn\'t connect to network.')
    });
  }

  /**
   * This function toggles the display of the comment modal
   * @param {*} e - an event object
   */
  showModal(e) {
    e.preventDefault;
    const displayModal = true;
    this.setState({ displayModal });
  }

  /**
   * This function hides the comment modal. We do a separate function
   * rather than !displayModal toggle because we listen for the Escape key,
   * and don't want it to toggle the modal back on.
   * @param {*} e - an event object
   */
  hideModal(e) {
    e.preventDefault;
    const displayModal = false;
    this.setState({ displayModal });
  }

  /**
   * Make an API request to the server for helpfulness rating counts of the current
   * review. Eg Yes: X, No: Y, Funny: Z
   */
  getReview() {
    $.ajax({
      url: '/reviews',
      method: 'GET',
      data: {
        where: {
          post_id: this.props.post_id
        }
      },
      success: (helpfulness) => {
        console.log('PostID ' + this.props.post_id + JSON.stringify(helpfulness));
        this.setState({ helpfulness });
      },
      error: () => console.error('Couldn\'t connect to network.')
    });
  }

  /**
   * Render the component with a couple conditions
   * Modal: if the source is a modal we hide the comment button
   * Mini: if the source is the MiniReview component, we shorten some text
   */
  render() {
    let reviewCounts;
    if (this.props.mini) {
      reviewCounts = <div></div>;
    } else {
      reviewCounts = 
        <FeedbackWrapper>
          <div>
            <Feedback>{this.props.yes} found this review helpful</Feedback>
            <Feedback>{this.props.funny} found this review funny</Feedback>
          </div>
          {
            this.props.source === 'standard' ? <CommentButton onClick={this.showModal} src='/images/comment_quoteicon_blue.png' /> :
              this.props.source === 'modal' ? null : null
          }
        </FeedbackWrapper>;
    }

    return (
      <Wrapper>
        {
          this.state.displayModal ? <CommentModal hideModal={this.hideModal} review={this.props.review} /> : null
        }
        <Text>{this.props.mini ? 'Helpful?' : 'Was this review helpful?'}</Text>
        <RatingButtons helpfulness={this.state.helpfulness} updateHelpfulness={this.updateHelpfulness.bind(this)}/>
        {reviewCounts}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
`;

const Text = styled.div`
  color: #8091a2;
  font-size: 12px;
  line-height: 35px;
  display: inline;  
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  opacity: 0.6;
`;

const Feedback = styled.div`
  color: #647580;
  font-size: 12px;
  display: block;
  padding-top: 0px;
  padding-bottom: 0px;
`;

const FeedbackWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentButton = styled.img`
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
`;

export default ReviewRating;