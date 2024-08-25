import React, { useState, useEffect } from 'react';
import styled,{ThemeProvider} from 'styled-components';

const PrayerTimeCard = ({ prayer, time, iqama }) => {
  const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDayTime(hour >= 6 && hour <= 18);
  }, []);

  return (
     <ThemeProvider theme={isDayTime ? lightTheme : darkTheme}>
    <Card>
      <Text>{prayer}</Text>
      <TimeText>{time}</TimeText>
      <Text>Iqama  الإقامة</Text>
       <TimeText>{iqama}</TimeText>
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
    margin: 10px;
    text-align: center;
    width: 200px;      
    display: flex;   
    flex-direction: column;
    justify-content: center;
    background: ${({ theme }) => theme.background || `#fff`}; 

    @media (max-width: 430px) {
    width: 120px;
  }
    
`;

const Text = styled.span`
  font-size: 1.75rem;
  text-align: center;
   @media (max-width: 430px) {
    font-size: 0.75rem;
  }
`;

const TimeText = styled.span`
 font-weight: bold;
 font-size: 2rem;

   @media (max-width: 430px) {
    font-size: 1rem;
  }

`

export default PrayerTimeCard;
