import React from 'react';
import { shallow, mount } from 'enzyme';
import ReviewsModule from '../client/src/ReviewsModule.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import $ from 'jquery';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('jquery', () => {
  const example = [
    { count: 0, reviews: ['test'] }
  ];
  
  return {
    ajax: jest.fn(() => Promise.resolve(example)),
  };
});

beforeEach(() => jest.resetModules());

describe('ReviewsModule component', () => {
  it('starts with a count of 0', () => {
    const wrapper = shallow(<ReviewsModule />);
    const countState = wrapper.state().count;
    expect(countState).toEqual(0);
  });

  it('makes an AJAX call after component mounts', () => {
    const wrapper = shallow(<ReviewsModule />);
    wrapper.instance().componentDidMount();
    expect($.ajax).toHaveBeenCalled();
  });

  it('calls into $.ajax with the correct params', () => {
    const wrapper = new ReviewsModule();
    const getReviews = wrapper.getReviews.bind(wrapper);
    const callback = (data) => {
      expect($.ajax).toBeCalledWith({
        success: expect.any(Function),
        error: expect.any(Function),
        data: expect.any(Object),
        method: 'GET',
        url: 'http://localhost:3005/reviews'
      });
      expect(typeof data).toBe('object');
      done();
    };

    getReviews(callback);
  });
});
