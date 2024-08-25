import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import useTheme from '../../hooks/useTheme';

const NextPrayerCard = () => {

  const theme = useTheme();

  const [upcoming, setUpcoming] = useState();

  useEffect(() => {

    const upcoming_prayer = {
      prayer: 'Zuhr    الظهر',
      time: '00:00',
      iqama: '00:00',
    }

    setUpcoming(upcoming_prayer)

  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Text>{upcoming?.prayer}</Text>
        <Time>{upcoming?.time}</Time>
        <Text>Iqama    الإقامة</Text>
        <Time>{upcoming?.iqama}</Time>
      </Card>
    </ThemeProvider>
  );
};



const Card = styled.div`
    padding: 15px;
    border-radius: 20px;
    text-align: center;
    margin: 10px;
    display: flex;    
    flex-direction: column;
    justify-content: center;
`;

const Text = styled.span`
    font-size: 4vw;
    text-align: center;
      @media (max-width: 430px) {
    font-size: 1.3rem;
  }
`;

const Time = styled.span`
    font-weight: bold;
    font-size: 5vw;
      @media (max-width: 430px) {
    font-size: 3rem;
  }
`

export default NextPrayerCard;