import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import useTheme from '../../hooks/useTheme';
const PrayerTimeCard = ({ prayer, time, iqama }) => {


  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Text>{prayer}</Text>
        <TimeText>{time}</TimeText>
        <Text>Iqama  الإقامة</Text>
        <TimeText>{iqama}</TimeText>
      </Card>
    </ThemeProvider>
  );
};


const Card = styled.div`
    padding: 15px;
    border-radius: 20px;
    margin: 10px;
    text-align: center;
    width: 12.5vw;      
    display: flex;   
    flex-direction: column;
    justify-content: center;
    background: ${({ theme }) => theme.background || `#fff`}; 
    color: ${({ theme }) => theme.textColor};

    @media (max-width: 430px) {
    width: 120px;
  }
    
`;

const Text = styled.span`
  font-size: 1.75vw;
  text-align: center;
   @media (max-width: 430px) {
    font-size: 0.75rem;
  }
`;

const TimeText = styled.span`
 font-weight: bold;
 font-size: 2vw;

   @media (max-width: 430px) {
    font-size: 1rem;
  }

`

export default PrayerTimeCard;
