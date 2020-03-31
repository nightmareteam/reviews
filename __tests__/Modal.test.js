/* eslint-disable camelcase */
import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../client/src/Modal.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let props;
let mockCallback;

const createProps = (mockCallback) => ({

});

beforeEach(() => {
  jest.resetModules();
  mockCallback = jest.fn();
  props = createProps(mockCallback);
  wrapper = shallow(<Modal onClick={mockCallback} /> );
});

describe('<Modal /> rendering', () => {
  it('should render elements', () => {
    expect(wrapper).toMatchSnapshot();
  });
});