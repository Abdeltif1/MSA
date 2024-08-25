import React, { useState, useEffect } from 'react';
import styled,{ThemeProvider} from 'styled-components';

const NextPrayerCard = ({ prayer, time, iqama }) => {
  const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDayTime(hour >= 6 && hour <= 18);
  }, []);

  return (
     <ThemeProvider theme={isDayTime ? lightTheme : darkTheme}>
    <Card>
      <Text>{prayer}</Text>
      <Time>{time}</Time>
      <Text>Iqama    الإقامة</Text>
       <Time>{iqama}</Time>
    </Card>
    </ThemeProvider>
  );
};




const lightTheme = {
  background:' linear-gradient(to bottom, #F7F274 0%, rgba(236, 255, 245, 0.2) 100%)',
  textColor: '#000',
};

const darkTheme = {
  background: 'linear-gradient(to bottom, #2c3e50, #000000)',
  textColor: '#fff',
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
    font-size: 4rem;
    text-align: center;
      @media (min-width: 1920px) {
    /* Large screens and smart TVs */
    font-size: 0.25rem;
  }
`;

const Time = styled.span`
    font-weight: bold;
    font-size: 5rem;
      @media (min-width: 1920px) {
    /* Large screens and smart TVs */
    font-size: 0.5rem;
  }
`

export default NextPrayerCard;