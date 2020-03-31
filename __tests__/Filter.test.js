import React from 'react';
import { shallow, mount } from 'enzyme';
import Filter from '../client/src/Filter.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let props;
let mockCallback;

const createProps = (mockCallback) => ({
  setFilters: mockCallback,
  filter: {
    id: 'test_id',
    displayName: 'display_name',
    options: {
      optionId: 'test',
      optionName: 'Test Name'
    }
  }
});

beforeEach(() => {
  jest.resetModules();
  mockCallback = jest.fn();
  props = createProps(mockCallback);
  wrapper = shallow(<Filter {...props} /> );
});

describe('<Filter /> rendering', () => {

  it('should render elements', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with the hover state to be false', () => {
    expect(wrapper.state('showMenu')).toBe(false);
  });
});

// describe('Selecting filter options', () => {

//   it('should have filter buttons', () => {
//     expect(wrapper.find('FilterDropdown')).toHaveLength(1);
//     wrapper.find('FilterButton').simulate('hover');
//     //expect(wrapper.state('showMenu')).toBe(true);
//   });
// });