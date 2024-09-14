import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PrayerTimeCard from '../cards/PrayerTimeCard';
import { useQueryParams } from '../../hooks/useQueryParams';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { test } from '../../helper/realTime';

const Prayers = ({ isSmallScreen }) => {


    const [prayers, setPrayers] = useState([]);
    const queryParams = useQueryParams();

    function checkDayTransition() {

        const now = new Date(); 
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const timeUntilMidnight = midnight.getTime() - now.getTime();

        setTimeout(() => { 
            loadNextDayPrayers();
            checkDayTransition(); // Call again for the next day
         },
          timeUntilMidnight); }

    function loadNextDayPrayers() {
        const fetchData = async () => {

            try {
                const baseUrl = process.env.REACT_APP_API_BASE_URL;

                const url = `${baseUrl}dailyprayers${queryParams}`;

                const response = await fetch(url);
                const result = await response.json();

                if (!isSmallScreen) {
                    result.pop();
                }

                setPrayers(result)
            }
            catch (error) {
                console.log('error:', error);
            }
        };

        if (queryParams) {
            fetchData();
    }
}

    

    useEffect(() => {

        const fetchFromFireBase = async () => {
             try {
            const docRef = doc(db, "prayers", "iqama");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }
             } catch (error) {
                console.log('Error fetching Iqama times:', error);
                }
        };
        
        fetchFromFireBase();


        loadNextDayPrayers();
        checkDayTransition();



    }, [isSmallScreen, queryParams]);



    return (
        <CardsContainer>
            {prayers?.map((prayer, index) => (
                <PrayerTimeCard
                    key={index}
                    prayer={prayer[0]}
                    time={prayer[1]}
                    iqama={prayer[1]}

                />
            ))}
        </CardsContainer>
    )
}

const CardsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 430px) {
     margin-bottom: 5px;
  }
`

export default Prayers

