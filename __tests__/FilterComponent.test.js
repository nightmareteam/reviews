import React from 'react';
import { shallow } from 'enzyme';
import FilterComponent from '../client/src/FilterComponent.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let props;
let mockCallback;

const createProps = (mockCallback) => ({
  setFilters: mockCallback,
  count: 0,
  filters: [
    {
      id: 'recommended',
      displayName: 'Review Type', 
      options: [
        {
          id: '1',
          displayName: 'Positive',
          count: 48
        },
        {
          id: '0',
          displayName: 'Negative',
          count: 52
        }
      ]
    },
    {
      id: 'language',
      displayName: 'Language', 
      options: [
        {
          'id': 'arabic',
          'displayName': 'Arabic',
          'count': 4
        },
        {
          'id': 'armenian',
          'displayName': 'Armenian',
          'count': 1
        }
      ]
    },
  ],
  activeFilters: {}
});

beforeEach(() => {
  jest.resetModules();
  mockCallback = jest.fn();
  props = createProps(mockCallback);
  wrapper = shallow(<FilterComponent {...props} /> );
});

describe('<FilterComponent /> rendering', () => {
  it('should render elements', () => {
    expect(wrapper).toMatchSnapshot();
  });
});