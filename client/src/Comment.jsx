//import styled from 'styled-components';
import React from 'react';
import moment from 'moment';
const styled = window.styled;

/**
 * Component to render a user's comment
 * @param {Object} comment - a comment object
 */
const Comment = ({comment}) => (
  <CommentWrapper>
    <Avatar src={comment.user_avatar} />
    <RightDiv>
      <CommentHeader>
        <UserName>
          {comment.username}
        </UserName>
        <Date>
          {moment(comment.comment_date).format('MMM Do YYYY [@] h:mm:ss a')}
        </Date>
      </CommentHeader>
      <ContentContent>
        {comment.comment_content}
      </ContentContent>
    </RightDiv>
  </CommentWrapper>
);

const CommentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: left;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  height: 34px;
  background: linear-gradient( to bottom, #515151 5%, #474747 95%);
  padding: 1px;
`;

const RightDiv = styled.div`
  display: block;
  justify-content: flex-start;
  margin-left: 10px;
`;

const CommentHeader = styled.div`
  display: inline-flex;
  margin-bottom: 5px;
`;

const UserName = styled.div`
  font-size: 14px;
  text-decoration: none;
`;

const Date = styled.div`
  font-size: 11px;
  color: #56707f;
  margin-left: 4px;
  line-height: 14px;
`;

const ContentContent = styled.div`
  font-size: 13px;
  color: #acb2b8;
  word-wrap: break-word;  
  overflow-y: auto;
  max-height: 400px;
  line-height: 18px;
  display: block;
`;

export default Comment;