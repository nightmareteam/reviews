import React from 'react';
import Graph from './Graph.jsx';
//import styled from 'styled-components';
const styled = window.styled;
import $ from 'jquery';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overallData: {},
      recentData: {}
    };
  }

  componentDidMount() {
    this.getOverallData();
    this.getRecentData();
  }

  getOverallData() {
    $.ajax({
      url: '/graphOverall',
      method: 'GET',
      success: overallData => {
        this.setState({ overallData });
      },
      error: () => console.error('Couldn\'t pull graph data')
    });
  }

  getRecentData() {
    $.ajax({
      url: '/graphRecent',
      method: 'GET',
      success: recentData => {
        this.setState({ recentData });
      },
      error: () => console.error('Couldn\t pull graph data')
    });
  }

  render() {
    const w = 605;
    const h = 260;

    return (
      <Wrapper>
        <OverallWrapper width={w}>
          <Graph primary={true} height={h} width={w} overallData={this.state.overallData}/>
        </OverallWrapper>
        <RecentWrapper>
          <Graph primary={false} height={h} width={375} overallData={this.state.recentData}/>
        </RecentWrapper>
      </Wrapper>
    );
  }
}

const OverallWrapper = styled.div`
  width: 100%;
  @media only screen and (min-width: 955px) {
    display: inline-block;
    width: ${props => props.width + 'px'};
  }
`;

const RecentWrapper = styled.div`
  display: none;
  @media only screen and (min-width: 955px) {
    display: inline-block;
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

export default Chart;