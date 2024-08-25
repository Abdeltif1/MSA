import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PrayerTimeCard from '../cards/PrayerTimeCard';

const Prayers = ({ isSmallScreen }) => {


    const [prayers, setPrayers] = useState();

    useEffect(() => {

        const prayers_sample = [
            { prayer: 'Fajr  الفجر', time: '00:01', iqama: '00:00' },
            { prayer: 'Zuhr الظهر', time: '00:01', iqama: '00:00' },
            { prayer: 'Asr العصر', time: '00:00', iqama: '00:00' },
            { prayer: 'Maghrib المغرب', time: '00:00', iqama: '00:00' },
            { prayer: 'Isha العشاء', time: '00:00', iqama: '00:00' },
            { prayer: 'Isha العشاء', time: '00:00', iqama: '00:00' },
        ];

        if (!isSmallScreen) {
            prayers_sample.pop();
        }

        setPrayers(prayers_sample)

    }, [isSmallScreen]);



    return (
        <CardsContainer>
            {prayers?.map((prayer, index) => (
                <PrayerTimeCard
                    key={index}
                    prayer={prayer.prayer}
                    time={prayer.time}
                    iqama={prayer.iqama}

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

