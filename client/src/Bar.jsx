import React from 'react';
//import styled from 'styled-components';
const styled = window.styled;

const Bar = ({width, height, barMargin, reverse}) => (
  <GraphBar reverse={reverse} height={height} width={width} barMargin={barMargin}/>
);

const GraphBar = styled.div`
  background: ${props => props.reverse ? '#a34c25' : '#66c0f4'};
  margin-left: ${props => props.barMargin + 'px'};
  height: ${props => props.height + 'px'};
  width: ${props => props.width + 'px'};
  display: inline-block;
  &:hover {
    background: white;
  }
`;

export default Bar;