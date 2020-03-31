import React from 'react';
import moment from 'moment';
//import styled from 'styled-components';
const styled = window.styled;
import ReviewRating from './ReviewRating.jsx';

/**
 * Display a review in a mini version of the Review component. This is used
 * in Recently Posted.
 * @param {Object} review - a Review object containing properties of the review
 */
const MiniReview = ({review}) => (
  <ReviewBox className="review-box">
    <RightColumn>
      <VoteHeader>
        { review.recommended ? <Thumb src="/images/thumbs-up.png" /> : <Thumb src="/images/thumbs-down.png" /> }
        <TextContainer>
          <Username>
            {/* <Popup /> */}
            <Link>{ review.username }</Link>
          </Username>
          <Hours>
            { `${review.hours_played} hrs` }
          </Hours>
          {/* <SteamKey src='/images/icon_review_key.png'/> */}
        </TextContainer>
      </VoteHeader>
      <CommentContainer>
        <PostDate>
          { `POSTED ${ moment(review.review_date).format('MMM Do').toUpperCase()}`}
        </PostDate>
        <Content>
          { `${(review.content)}`}
        </Content>
        <Divider />
        <ReviewRating post_id={review.post_id} mini={true} yes={review.helpful_yes_count} no={review.helpful_no_count} funny={review.helpful_funny_count}/>
      </CommentContainer>
    </RightColumn>
  </ReviewBox>
);

const Popup = styled.div`
  background: red;
  width: 300px;
  height: 200px;
  position: absolute;
  z-index: 100;
`;

const ReviewBox = styled.div`
  margin: 5px 0px 20px 5px;
  width: 100%;
  background-image: linear-gradient(to right, #213143 , transparent);
  color: #c1dbf4;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  padding-bottom: 10px;
  margin-bottom: 20px;
  @media only screen and (min-width: 768px) {
    width: auto;
  }
`;

const Column = styled.div`
  position: relative;
  display: inline-block;
`;

const Link = styled.a`
  color: #c1dbf4;
`;

const RightColumn = styled(Column)`
  width: 100%;
`;

const VoteHeader = styled.div`
  vertical-align: top;
  background: #0e1622;
  height: 24px;
  width: 100%;
  display: flex;
  justify-content: left;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const Thumb = styled.img`
  height: inherit;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  line-height: 24px;
  padding-right: 5px;
  padding-left: 5px;
`;

const Username = styled.div`
  font-size: 12px;
`;

const Hours = styled.div`
  color: #8091a2;
  font-size: 11px;
`;

const SteamKey = styled.img`
  height: inherit;
  height: 16px;
`;

const Content = styled.div`
  color: #acb2b8;
  font-size: 13px;
  margin-bottom: 10px;
  line-height: 17px;
`;

const CommentContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba( 0, 0, 0, 0.5 );
  margin-bottom: 5px;
`;

const PostDate = styled.div`
  color: #8091a2;
  font-size: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default MiniReview;
