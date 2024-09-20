import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider, } from 'styled-components';
import NextPrayerCard from '../cards/NextPrayerCard';
import JumaaPrayerCard from '../cards/JumaaPrayerCard';
import useTheme from '../../hooks/useTheme';
import Clock from '../elements/Clock';
import Sun from '../../assets/images';
import { useQueryParams } from '../../hooks/useQueryParams';
import moment from 'moment-hijri';

const Head = ({ isSmallScreen }) => {

    const [upcoming, setUpcoming] = useState({});
    const [hijriDate, setHijriDate] = useState('');
    const [gregorianDate, setGregorianDate] = useState('');

    const queryParams = useQueryParams();


    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const baseUrl = process.env.REACT_APP_API_BASE_URL;

                const url = `${baseUrl}upcomingprayer${queryParams}`;

                const response = await fetch(url);
                const result = await response.json();


                if (!result) {
                    return
                }

                setUpcoming(result)
            }
            catch (error) {
                console.log('error:', error);
            }
        };

        if(queryParams){
            fetchData();
        }
     

    }, [queryParams]);





    useEffect(()=>{
 
          const todayGregorian = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const todayHijri = moment().format('iD iMMMM iYYYY');
        setGregorianDate(todayGregorian);
        setHijriDate(todayHijri);
      
            
    }, []);

    return (
        <ThemeProvider theme={theme}>

            <Container>
                <Wrapper>

                    <LeftSide>
                        <Text>{"MSA Concordia - مصلى"}</Text><br></br>
                        <Clock />
                        <p>{gregorianDate}, {hijriDate}</p>
                        <ImamText>Imam    الامام</ImamText><br></br>
                        <Imam>{upcoming[3]}</Imam>
                    </LeftSide>
                    <br></br>
                    <MiddleSide>
                        <NextPrayerCard nextPrayer={upcoming} />
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

export default Head;