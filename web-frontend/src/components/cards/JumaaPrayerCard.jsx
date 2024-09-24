import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';


import useTheme from "../../hooks/useTheme";
const JumaaPrayerCard = () => {
  const theme = useTheme();

  const [jumaa, setJumaa] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;

        
        const url = `${baseUrl}jumaaprayer`;
        const response = await fetch(url);
        const result = await response.json();

        setJumaa(result);
      } catch (error) {
        console.log("error:", error);
      }
    };


    fetchData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Card>
                <Text>Jumaa </Text>
                <TimeText>{jumaa.khutba}</TimeText>
                <Text>Imam</Text>
                <TimeText>{jumaa.imam}</TimeText>
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
    font-size: 1vw;
  }
`;

export default JumaaPrayerCard;
