import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import useTheme from '../../hooks/useTheme';


const NextPrayerCard = ({ nextPrayer }) => {

  const theme = useTheme();

  const [upcoming, setUpcoming] = useState([]);



  useEffect(() => {

    
    setUpcoming(nextPrayer);
    


  }, [nextPrayer]);

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Text>{upcoming[0]}</Text>
        <Time>{upcoming[1]}</Time>
        <Text>Iqama    الإقامة</Text>
        <Time>{upcoming[2]}</Time>
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