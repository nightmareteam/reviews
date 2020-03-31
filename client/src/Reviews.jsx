import React from 'react';
import Review from './Review.jsx';
//import styled from 'styled-components';
const styled = window.styled;

/**
 * The reviews component displays all reviews from an array
 * @param {Array} reviews - an array of review objects
 * @param {String} sort - a string indicating the sort order of reviews 
 */
const Reviews = ({reviews, sort}) => (
  <ReviewsWrapper> 
    <Title>MOST {sort.toUpperCase()} REVIEWS</Title>
    <Subtitle>IN THE PAST 30 DAYS</Subtitle>
    {
      reviews.map(review => <Review key={review.post_id} review={review} source={'standard'}/>)
    }
  </ReviewsWrapper>
);

const Title = styled.div`
  padding-top: 20px;
  font-size: 14px;
  padding-right: 5px;
  color: white;
  display: inline;
`;

const Subtitle = styled(Title)`
  color: #56707f;
`;

const ReviewsWrapper = styled.div`
  float: left;
  width: 100%;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  background: inherit;
  @media only screen and (min-width: 768px) {
    width: auto;
  }
`;

export default Reviews;