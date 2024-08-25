import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import PrayerTimeCard from '../cards/PrayerTimeCard';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Sun from '../../assets/images';


const MainLayout = () => {
    const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDayTime(hour >= 6 && hour <= 18);
  }, []);

  const prayers = [
    { prayer: 'Fajr  الفجر', time: '00:01', iqama: '00:00' },
    { prayer: 'Zuhr الظهر', time: '00:01', iqama: '00:00' },
    { prayer: 'Asr العصر', time: '00:00', iqama: '00:00' },
    { prayer: 'Maghrib المغرب', time: '00:00', iqama: '00:00' },
    { prayer: 'Isha العشاء', time: '00:00', iqama: '00:00' }
  ];

  return (
     <ThemeProvider theme={isDayTime ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Container>
      <Header
        title="MSA Concordia - مصلى"
        time="00:00"
        imam="Mohamed Mohamed"
        date="21 August 2024, 17 Safar 1446"
      />
      <RightSide>
         <Sun/>
            <PrayerTimeCard
            key={0}
            prayer={"Jumaa"}
            time={"13:00"}
            iqama={"13:30"}
            theme={isDayTime ? lightTheme : darkTheme}
          />
        
      </RightSide>
    
        </Container>
      <CardsContainer>
        {prayers.map((prayer, index) => (
          <PrayerTimeCard
            key={index}
            prayer={prayer.prayer}
            time={prayer.time}
            iqama={prayer.iqama}
            theme={isDayTime ? lightTheme : darkTheme}
          />
        ))}
      </CardsContainer>
    
    </ThemeProvider>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
    min-height: 100vh;

  }
`;

const lightTheme = {
  background: 'linear-gradient(to bottom, #B7EAFF, #94DFFF)',
  textColor: '#000',
};

const darkTheme = {
  background: 'linear-gradient(to bottom, #2c3e50, #000000)',
  textColor: '#fff',
};


const Container = styled.div`
  display: flex; /* Enables flexbox */
  justify-content: center; /* Centers the cards horizontally */
  align-items: center;
  color: ${({ theme }) => theme.textColor};

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;

  
  color: ${({ theme }) => theme.textColor};

  @media (max-width: 960px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

`;

const CardsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 960px) {
     margin-bottom: 5px;
  }
`

export default MainLayout;