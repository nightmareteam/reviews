import React from 'react';
//import styled from 'styled-components';
const styled = window.styled;

/**
 * This component renders each filter in the filter selection bar.
 * @extends React.Component
 */
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }
  
  /**
   * Display menu and update showMenu state
   * @param {Object} e - an event object
   */
  showMenu(e) {
    e.preventDefault();
    this.setState({
      showMenu: true
    });
  }

  /**
   * Hide menu and update showMenu state
   * @param {Object} e - an event object
   */
  hideMenu(e) {
    e.preventDefault();
    this.setState({
      showMenu: false
    });
  }

  render() {
    // Display each filter and its respective options
    // When the filter is hovered over (state.showMenu: true), we should display the options
    // When a user clicks on a filter option, that option becomes set in the main component as an active filter
    const setFilters = this.props.setFilters;
    return (
      <FilterDropdown onMouseEnter={this.showMenu.bind(this)} onMouseLeave={this.hideMenu.bind(this)}>
        <FilterButton hover={this.state.showMenu} >{this.props.filter.displayName.toUpperCase()}</FilterButton>
        {
          this.state.showMenu ? 
            (
              <FilterMenu>
                <FilterOption>
                  <RadioButton onClick={(e) => setFilters(e, this.props.filter.id, {optionId: {}})} name={this.props.filter.id} type="radio" id='all'/>
                  <RadioLabel onClick={(e) => setFilters(e, this.props.filter.id, {optionId: {}})} htmlFor='all'>All</RadioLabel>
                  <OptionCount>({this.props.filter.options.reduce((total, current) => (total + current.count), 0)})</OptionCount>
                </FilterOption>
                {
                  this.props.filter.options.map(option => {
                    let optionId = option.id;
                    let optionName = option.displayName;
                    let count = option.count;

                    return (
                      <FilterOption key={optionId}>
                        <RadioButton onClick={(e) => setFilters(e, this.props.filter.id, { optionId, optionName})} name={this.props.filter.id} type="radio" id={optionId}/>
                        <RadioLabel onClick={(e) => setFilters(e, this.props.filter.id, { optionId, optionName})} htmlFor={optionId}>{optionName}</RadioLabel>
                        <OptionCount>({count})</OptionCount>
                      </FilterOption>
                    );
                  })
                }
              </FilterMenu>
            )
            : null
        }
      </FilterDropdown>
    );
  }
}

const FilterDropdown = styled.div`
  display: inline-block;
  position: relative;
`;

const FilterButton = styled.div`
  border-radius: 0px;
  display: inline-block;
  color: #4582a5;
  padding: 10px;
  padding-right: 25px;
  background: ${props => props.hover ? '#c6d4df' : '#1f2e42' };
  font-size: 10px;
  background-image: ${props => props.hover ? 'url("/images/btn_arrow_down_padded_black.png")' : 'url("/images/btn_arrow_down_padded.png")'};
  background-repeat: no-repeat;
  background-position: right 5px center;
  border-left: 1px solid #2a475e;
`;

const FilterMenu = styled.ul`
  margin: 0;
  padding: 5px 0px;
  top: 30px;
  left: 1px;
  width: 200px;
  background: #c6d4df;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const FilterOption = styled.li`
  padding: 3px 5px;
  background: #c6d4df;
  color: #556772;
  font-size: 12px;
  font-weight: normal;
`;

const RadioButton = styled.input`
`;

const RadioLabel = styled.label`
`;

const OptionCount = styled.div`
  display: inline;
  color: #7193a6;
  padding-left: 3px;
`;

FilterDropdown.displayName = 'FilterDropdown';
FilterButton.displayName = 'FilterButton';
FilterMenu.displayName = 'FilterMenu';
RadioButton.displayName = 'RadioButton';
RadioLabel.displayName = 'RadioLabel';
FilterOption.displayName = 'FilterOption';
OptionCount.displayName = 'OptionCount';

export default Filter;