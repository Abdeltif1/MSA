import React, { useState, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import NextPrayerCard from './NextPrayerCard';



const Header = ({ title, time, imam, date }) => {

    const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDayTime(hour >= 6 && hour <= 18);
  }, []);
  return (
    <ThemeProvider theme={isDayTime ? lightTheme : darkTheme}>
    <HeaderStyle>
      
      <HeaderChild1>
        <Text>{title}</Text><br></br>
        <Time>{time}</Time>
        <p>{date}</p>
        <ImamText>Imam    الامام</ImamText><br></br>
        <Imam>{imam}</Imam>
      </HeaderChild1>
      <br></br>
      <HeaderChild2>
        <NextPrayerCard
            prayer={'Zuhr    الظهر'}
            time={'00:00'}
            iqama={'00:00'}
            theme={isDayTime ? lightTheme : darkTheme}
          />
      </HeaderChild2>
    </HeaderStyle>
    </ThemeProvider>
  );
};

const lightTheme = {
    background:' linear-gradient(to bottom, #F7F274 0%, rgba(236, 255, 245, 0.2) 100%);',
  textColor: '#000',
  
    
};

const darkTheme = {
  background: 'linear-gradient(to bottom, #2c3e50, #000000)',
  textColor: '#fff',
};

const HeaderStyle = styled.div`
    padding: 15px;
    border-radius: 15px;
    margin-top: 10px;
    width: 60%;
    display: flex;
    flex-direction: row;
    text-align: center;
    background: ${({ theme }) => theme.background || `#fff`}; 

    @media (max-width: 960px) {
    flex-direction: column;
    width: 100%;
    margin: 0px;
    border-radius: 0;
  }
`;

const HeaderChild1 = styled.div`
    
`

const HeaderChild2 = styled.div`
@media (max-width: 960px) {
    box-shadow: 0 -5px 0 rgba(0, 0, 0, 0.1);
  }`

const Time = styled.span`
    text-align: right;
    font-size: 9rem;
    font-weight: bold;
    @media (max-width: 960px) {
    font-size: 5rem;
  }
`

const Text = styled.span`
    font-size: 3rem;
    text-align: center;
     
    @media (max-width: 960px) {
    font-size: 2rem;
  }
  
`;

const Imam = styled.span`
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
      @media (min-width: 1920px) {
    /* Large screens and smart TVs */
    font-size: 0.5rem;
  }
`

const ImamText = styled.span`
    font-size: 2rem;
    @media (min-width: 1920px) {
    /* Large screens and smart TVs */
    font-size: 0.5rem;
  }
`

export default Header;