import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsModule from './ReviewsModule.jsx';
import path from 'path';

ReactDOM.render(<ReviewsModule style={{display: 'inline-block'}}/>, document.getElementById('reviews'));

// ReactDOM.render(<ReviewsModule game_id={path.basename(document.URL)} style={{display: 'inline-block'}}/>, document.getElementById('reviews'));