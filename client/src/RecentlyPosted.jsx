import React from 'react';
//import styled from 'styled-components';
const styled = window.styled;
import MiniReview from './MiniReview.jsx';

/**
 * Display recently posted reviews
 * @param {Array} reviews - an array of Review objects
 */
const RecentlyPosted = ({reviews}) => ((
  <ReviewsWrapper> 
    <Title>RECENTLY POSTED</Title>
    {
      reviews.map(review => <MiniReview key={review.post_id} review={review}/>)
    }
  </ReviewsWrapper>
));


const Title = styled.div`
  padding-top: 20px;
  padding-left: 5px;
  font-size: 14px;
  padding-right: 5px;
  color: white;
  display: inline;
`;

const ReviewsWrapper = styled.div`
  
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  float: left;
  width: auto;
  background: inherit;
  @media only screen and (min-width: 768px) {
    width: 308px;
    margin-left: 10px;
  }
`;


export default RecentlyPosted;
