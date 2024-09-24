import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import PrayerTimeCard from '../cards/PrayerTimeCard';

const DailyPrayers = ({ daily }) => {

    const [prayers, setPrayers] = useState(null);

    useEffect(() => {
        console.log(daily);
        setPrayers(daily);

    }, [daily]);
    return (
        <CardsContainer>

            <PrayerTimeCard
                key={0}
                prayer={"Fajr"}
                time={prayers?.Fajr.adan}
                iqama={prayers?.Fajr.iqama}

            />
            <PrayerTimeCard
                key={1}
                prayer={"Dhuhr"}
                time={prayers?.Dhuhr.adan}
                iqama={prayers?.Dhuhr.iqama}
            />
            <PrayerTimeCard
                key={2}
                prayer={"Asr"}
                time={prayers?.Asr.adan}
                iqama={prayers?.Asr.iqama}
            />
            <PrayerTimeCard
                key={3}
                prayer={"Maghrib"}
                time={prayers?.Maghrib.adan}
                iqama={prayers?.Maghrib.iqama}
            />
            <PrayerTimeCard
                key={4}
                prayer={"Isha"}
                time={prayers?.Isha.adan}
                iqama={prayers?.Isha.iqama}
            />

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

export default DailyPrayers

