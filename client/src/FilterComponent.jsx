import React from 'react';
//import styled from 'styled-components';
const styled = window.styled;
import Filter from './Filter.jsx';
import ActiveFilters from './ActiveFilters.jsx';
import Chart from './Chart.jsx';

/**
 * This component renders available and active filters.
 * @param {Function} setFilters - function to update state with the selected filters
 * @param {Integer} count - the review count given the selected filters
 * @param {Array} filters - an array of filter objects {id, displayName}
 * @param {Object} activeFilters - an object of active filters { id, options: {optionId, optionName}}
 */
const FilterComponent = ({setFilters, count, filters, activeFilters, sort}) => (
  <FilterContainer className='FilterContainer'>
    <Chart />
    <FilterList className='FilterList'>
      {
        filters.map(filter => (<Filter setFilters={setFilters} key={filter.id} filter={filter} />))
      }
      <SummaryType>
        {'DISPLAY AS:'}
        <SummaryList onChange={(e) => sort(e)}>
          <SummaryOption value="helpful" default>Most Helpful</SummaryOption>
          <SummaryOption value="recent" default>Recent</SummaryOption>
          <SummaryOption value="funny" default>Funny</SummaryOption>
        </SummaryList>
      </SummaryType>
    </FilterList>
    {
      Object.keys(activeFilters).length > 0 ? <ActiveFilters setFilters={setFilters} activeFilters={activeFilters} /> : null
    }
    <FilterSummary>
      {'Showing '}
      <FilterCount>{count}</FilterCount> 
      {' reviews that match the filters above'} 
    </FilterSummary>
    <Divider />
  </FilterContainer>
);
const FilterList = styled.div`
  background: #1f2e42;
  min-width: 526px;
`;

const FilterContainer = styled.div`
`;

const FilterSummary = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  color: #c6d4df;
  font-size: 15px;
  display: block;
`;

const FilterCount = styled(FilterSummary)`
  font-weight: bold;
  display: inline-block;
`;

const SummaryType = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 0px;
  display: inline-block;
  color: #4582a5;
  padding: 3px 25px 7px 10px;
  background: inherit;
  font-size: 10px;
  border-left: 1px solid #2a475e
`;

const SummaryList = styled.select`
  width: 100px;
  background: #4582a5;
  font-size: 12px;
  border: none;
  border-radius: 2px;
  margin-left: 5px;
  margin-top: 2px;
`;

const Divider = styled.div`
  margin-bottom: 0px;

  @media only screen and (min-width: 768px) {
    height: 1px;
    background: rgba( 0, 0, 0, 0.5 );
    margin-bottom: 20px;
  }
`;

const SummaryOption = styled.option``;
export default FilterComponent;