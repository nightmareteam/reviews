import React from 'react';
//import styled from 'styled-components';
const styled = window.styled;
import Bar from './Bar.jsx';
import $ from 'jquery';

const Graph = ({primary, height, width, overallData }) => {
  overallData = Object.keys(overallData).length > 0 ? overallData : {data: [], count: 0, rating: ''};
  const buffer = 20;
  const bufferedHeight = height - 2 * buffer;
  const bufferedWidth = width - 2 * buffer;
  const maxRecommended = Math.max(...overallData.data.map(d => d.recommended));
  const maxNotRecommended = Math.max(...overallData.data.map(d => d.notRecommended));
  const maxHeight = maxRecommended + maxNotRecommended;
  const recommendedHeight = maxRecommended / maxHeight * bufferedHeight;
  const notRecommendedHeight = maxNotRecommended / maxHeight * bufferedHeight;
  const barWidth = bufferedWidth / overallData.data.length * .75;
  const barMargin = bufferedWidth / overallData.data.length * .25;

  return (
    <GraphWrapper primary={primary}>
      <RatingContainer width={width}>
        <TextContainer>
          <SectionTitle>{primary ? 'Overall Reviews:' : 'Recent Reviews:'}</SectionTitle>
          <SectionRating>{overallData.rating}</SectionRating>
          <ReviewCount>{`(${overallData.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}) reviews`}</ReviewCount>
        </TextContainer>
      </RatingContainer>
      <ChartWrapper>
        <Recommended height={recommendedHeight + buffer} width={width}>
          {
            overallData.data.map(data => 
              <Bar 
                reverse={false} 
                height={data.recommended / maxRecommended * recommendedHeight} 
                width={barWidth} 
                barMargin={barMargin} 
              />)
          }
        </Recommended>
        <NotRecommended height={notRecommendedHeight + buffer} width={width}>
          {
            overallData.data.map(data => 
              <Bar 
                reverse={true} 
                height={data.notRecommended / maxNotRecommended * notRecommendedHeight} 
                width={barWidth} 
                barMargin={barMargin} 
              />)
          }
        </NotRecommended>
      </ChartWrapper>
    </GraphWrapper>
  );
};
const GraphWrapper = styled.div`
  background: ${props => props.primary ? '#29475e' : '#3f647e'};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-bottom: 1px;
  background: inherit;
  border-bottom: 1px solid #000000;
  min-height: 38px;
  

`;

const TextContainer = styled.div`
  margin-left: 10px;
`;


const SectionTitle = styled.div`
  align-items: center;
  justify-content: flex-start;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  font-size: 15px;
  margin-bottom: 5px;
  color: #e5e5e5;
`;

const SectionRating = styled.div`
  color: #66C0F4;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: bold;
  font-size: 17px;
  line-height: 9px;
  text-shadow: 1px 1px rgba( 0, 0, 0, 0.2 );
  display: inline-block;
`;

const ReviewCount = styled.div`
  display: inline-block;
  margin-right: 15px;
  margin-left: 5px;
  color: #8ba6b6;
  position: relative;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
`;

const Recommended = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: inherit;
  height: ${props => props.height + 'px'};
  width: 100%;
`;

const NotRecommended = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: inherit;
  height: ${props => props.height + 'px'};
  width: 100%;
`;

const ChartWrapper = styled.div``;
export default Graph;