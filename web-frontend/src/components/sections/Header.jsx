import React from 'react';
import styled, { ThemeProvider, } from 'styled-components';
import NextPrayerCard from '../cards/NextPrayerCard';
import JumaaPrayerCard from '../cards/JumaaPrayerCard';
import useTheme from '../../hooks/useTheme';
import Clock from '../elements/Clock';
import Sun from '../../assets/images';

const Header = ({ title, isSmallScreen, imam, date }) => {

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>

      <Container>
        <Wrapper>

          <LeftSide>
            <Text>{title}</Text><br></br>
            <Clock />
            <p>{date}</p>
            <ImamText>Imam    الامام</ImamText><br></br>
            <Imam>{imam}</Imam>
          </LeftSide>
          <br></br>
          <MiddleSide>
            <NextPrayerCard />
          </MiddleSide>

        </Wrapper>

        {!isSmallScreen &&

          <RightSide>
            <Sun 
            path={theme.path}
            />
            <JumaaPrayerCard />
          </RightSide>
        }


      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  display: flex; /* Enables flexbox */
  justify-content: center; /* Centers the cards horizontally */
  align-items: center;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.textColor};

  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;

  color: ${({ theme }) => theme.textColor};

  

`;

const Wrapper = styled.div`
    padding: 15px;
    border-radius: 15px;
    margin-top: 10px;
    width: 60%;
    display: flex;
    flex-direction: row;
    text-align: center;
    background: ${({ theme }) => theme.background || `#fff`}; 

    @media (max-width: 430px) {
    width: 90%;
  }
`;

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 430px) {
    display:none;
  }`

const MiddleSide = styled.div`
    display: flex;
    flex-direction: column;
`


const Text = styled.span`
    font-size: 3vw;
    text-align: center;
     
    @media (max-width: 430px) {
    font-size: 1rem;
  }
  
`;

const Imam = styled.span`
    text-align: center;
    font-weight: bold;
    font-size: 2vw;
      @media (max-width: 430px) {
    font-size: 1rem;
  }
`

const ImamText = styled.span`
    font-size: 2vw;
    @media (max-width: 430px){
      font-size: 1rem;
    }
  
`

export default Header;