import React from 'react';
import { shallow } from 'enzyme';
import HelpfulButton from '../client/src/HelpfulButton.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let props;
let mockCallback;

const createProps = (mockCallback) => ({
  updateHelpfulness: mockCallback,
  active: false
});

beforeEach(() => {
  jest.resetModules();
  mockCallback = jest.fn();
  props = createProps(mockCallback);
  wrapper = shallow(<HelpfulButton {...props} /> );
});

describe('<HelpfulButton /> rendering', () => {
  it('should render elements', () => {
    expect(wrapper).toMatchSnapshot();
  });
});