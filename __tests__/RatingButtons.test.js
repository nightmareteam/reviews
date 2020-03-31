/* eslint-disable camelcase */
import React from 'react';
import { shallow } from 'enzyme';
import RatingButtons from '../client/src/RatingButtons.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let props;
let mockCallback;

const createProps = (mockCallback) => ({
  helpfulness: {
    yes: false,
    no: false, 
    funny: false
  },
  updateHelpfulness: mockCallback
});

beforeEach(() => {
  jest.resetModules();
  mockCallback = jest.fn();
  props = createProps(mockCallback);
  wrapper = shallow(<RatingButtons {...props} /> );
});

describe('<RatingButtons /> rendering', () => {
  it('should render elements', () => {
    expect(wrapper).toMatchSnapshot();
  });
});