/* eslint-disable camelcase */
import React from 'react';
import { shallow } from 'enzyme';
import Review from '../client/src/Review.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let props;
let mockCallback;

const createProps = (mockCallback) => ({
  review: {
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
  }
});

beforeEach(() => {
  jest.resetModules();
  mockCallback = jest.fn();
  props = createProps(mockCallback);
  wrapper = shallow(<Review {...props} /> );
});

describe('<Review /> rendering', () => {
  it('should render elements', () => {
    expect(wrapper).toMatchSnapshot();
  });
});