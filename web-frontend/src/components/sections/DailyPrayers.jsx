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
                time={prayers?.fajr.adan}
                iqama={prayers?.fajr.iqama}

            />
            <PrayerTimeCard
                key={1}
                prayer={"Dhuhr"}
                time={prayers?.dhuhr.adan}
                iqama={prayers?.dhuhr.iqama}
            />
            <PrayerTimeCard
                key={2}
                prayer={"Asr"}
                time={prayers?.asr.adan}
                iqama={prayers?.asr.iqama}
            />
            <PrayerTimeCard
                key={3}
                prayer={"Maghrib"}
                time={prayers?.maghrib.adan}
                iqama={prayers?.maghrib.iqama}
            />
            <PrayerTimeCard
                key={4}
                prayer={"Isha"}
                time={prayers?.isha.adan}
                iqama={prayers?.isha.iqama}
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

