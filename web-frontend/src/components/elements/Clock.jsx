import React from 'react';
import { useCurrentDate } from '../../hooks/useCurrentDate';
import { to12Format, addLeadingZero } from '../../helper/formatTime';



import styled from 'styled-components';

export default function Clock() {



    // Get the current time
    const date = useCurrentDate();
    const currentTime = `${date.getHours()}:${date.getMinutes()}`;

    const dayOrNight = date.getHours() < 12 ? "AM" : "PM";



    return (
        <div
        >
            <Time>
                {to12Format(currentTime)}
                <Seconds >
                    :{addLeadingZero(date.getSeconds())} {dayOrNight}
                </Seconds >
            </Time>

        </div>
    )
}

const Time = styled.span`
  font-size: 5vw;
  font-weight: bold;
    @media (max-width: 430px) {
    font-size: 2.75rem;
  }
`
const Seconds = styled.span`

      font-size: 1.5vw;
      font-weight: 400;
      padding: 0.1em;

`
