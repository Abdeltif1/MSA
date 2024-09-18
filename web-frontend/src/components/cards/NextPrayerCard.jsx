import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import useTheme from '../../hooks/useTheme';
import { useQueryParams } from '../../hooks/useQueryParams';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';

const NextPrayerCard = () => {

  const theme = useTheme();

  const [upcoming, setUpcoming] = useState([]);
  const queryParams = useQueryParams();
  const handleDoc = (doc) => { 
    
  }





  useEffect(() => {
 const fetchData = async() => {

        try{
            const baseUrl = process.env.REACT_APP_API_BASE_URL;

            const url = `${baseUrl}upcomingprayer${queryParams}`;

            const response = await fetch(url);
            const result = await response.json();


          if (!result){
            return
          }            

          
          
        
          const listenIqama = (col, docu) =>{
            onSnapshot(doc(db, col, docu), (doc) => {
              handleDoc(doc.data());
       });
      }
      listenIqama('prayers', 'iqama');
        setUpcoming(result)
        }
        catch (error){
            console.log('error:', error);
        }
    };

    if (queryParams){
        fetchData();
    }
   
   

        

    }, [queryParams]);

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