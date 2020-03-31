/* eslint-disable camelcase */
import React from 'react';
import CommentModal from './CommentModal.jsx';

var review = {
  content: 'Voluptatem voluptatem officia et.',
  createdAt: '2019-05-20T01:30:23.000Z',
  helpful_funny_count: 309,
  helpful_no_count: 503,
  helpful_yes_count: 993,
  hours_played: '2919',
  language: 'Turkish',
  post_id: 89613,
  product_count: 77,
  recommended: false,
  registration_date: '2018-11-24',
  review_count: 33,
  review_date: '2019-01-20',
  steam_level: 28,
  updatedAt: '2019-05-20T01:30:23.000Z',
  user_avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/blakesimkins/128.jpg',
  user_id: 88438,
  username: 'Salvador.OKon17'
};

const ModalRoot = ({modal, hideModal}) => {
  switch (modal) {
  case 'COMMENT_MODAL':
    return <CommentModal hideModal={hideModal} review={review}/>;
  }
};



export default ModalRoot;

