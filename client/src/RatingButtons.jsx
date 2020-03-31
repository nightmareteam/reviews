import React from 'react';
//import styled from 'styled-components';
const styled = window.styled;
import HelpfulButton from './HelpfulButton.jsx';

/**
 * This component displays the helpfulness buttons (Yes / No / Funny)
 * @param {Object} helpfuleness - an object with counts for each helpfulness property
 * @param {Function} updateHelpfulness - a function to toggle the helpfuless rating
 */
const RatingButtons = ({helpfulness, updateHelpfulness}) => {
  return (
    <Wrapper>
      <HelpfulButton active={helpfulness.yes} updateHelpfulness={updateHelpfulness} string={'Yes'}/>
      <HelpfulButton active={helpfulness.no} updateHelpfulness={updateHelpfulness} string={'No'}/>
      <HelpfulButton active={helpfulness.funny} updateHelpfulness={updateHelpfulness} string={'Funny'}/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline
`;

export default RatingButtons;