import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PrayerTimeCard from '../cards/PrayerTimeCard';
import { useQueryParams } from '../../hooks/useQueryParams';

const Prayers = ({ isSmallScreen }) => {


    const [prayers, setPrayers] = useState([]);
    const queryParams = useQueryParams();

    useEffect(() => {



        const fetchData = async () => {

            try {
                const baseUrl = process.env.REACT_APP_API_BASE_URL;

                const url = `${baseUrl}dailyprayers${queryParams}`;

                const response = await fetch(url);
                const result = await response.json();
                console.log(result);


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

