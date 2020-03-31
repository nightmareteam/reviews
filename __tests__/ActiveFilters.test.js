import React from 'react';
import { shallow } from 'enzyme';
import ActiveFilters from '../client/src/ActiveFilters.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let props;
let mockCallback;

const createProps = (mockCallback) => ({
  activeFilters: {
    language: {
      optionId: 'arabic',
      optionName: 'Arabic'
    }
  },
  setFilters: mockCallback
});

beforeEach(() => {
  jest.resetModules();
  mockCallback = jest.fn();
  props = createProps(mockCallback);
  wrapper = shallow(<ActiveFilters activeFilters={props.activeFilters} setFilters={mockCallback} /> );
});

describe('<ActiveFilters /> rendering', () => {
  it('should render elements', () => {
    expect(wrapper).toMatchSnapshot();
  });
});