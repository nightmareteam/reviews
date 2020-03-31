import React from 'react';
//import styled from 'styled-components';
const styled = window.styled;

/**
 * This component renders the active filters
 * @param {Object} activeFilters - a filter object with active filters { id, options: {optionId, optionName}}
 * @param {Function} setFilters - a function to update the selected filters
 */
const ActiveFilters = ({activeFilters, setFilters}) => (
  <FilterWrapper>
    {'Filters'}
    {
      Object.keys(activeFilters).map(key => (
        activeFilters[key] ? 
          (
            <FilterButton key={key} onClick={(e) => setFilters(e, key, {optionId: {}, optionId: {}})}>
              <FilterName >{activeFilters[key].optionName}</FilterName>
            </FilterButton>
          )
          : null
      ))
    }
  </FilterWrapper>
);

const FilterWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 0px;
  color: #c6d4df;
  font-size: 15px;
  display: inline-block;
  text-align: center;
`;

const FilterButton = styled.div`
  border-radius: 2px;
  padding-right: 25px;
  padding-left: 5px;
  background: #485260;
  display: inline-block;
  font-size: 12px;
  height: 24px;
  margin-left: 10px;
  vertical-align: middle;
  line-height: 24px;
  background-image: url('/images/deleteSearchTerm.png');
  background-repeat: no-repeat;
  background-position: right 5px center;
  cursor: pointer;
`;

const FilterName = styled.div``;

export default ActiveFilters;