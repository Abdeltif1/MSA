

import React, { useState } from 'react';

    const JumaaTime = () => {
      const [selectedTime, setSelectedTime] = useState('13:15');
      const [imamName, setImamName] = useState('walid');

      const generateTimeOptions = () => {
        const times = [];
        let start = 12 * 60; // 12:00 in minutes
        const end = 14 * 60; // 14:00 in minutes

        while (start <= end) {
          const hours = Math.floor(start / 60);
          const minutes = start % 60;
          const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          times.push(time);
          start += 5; // increment by 5 minutes
        }

        return times;
      };

      const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
      };

      const handleImamNameChange = (event) => {
        setImamName(event.target.value);
      };

      const handleSubmit = async () => {
        const jumaaDetails = {
          khutba: selectedTime,
          imam: imamName,
        };

         try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const url = `${baseUrl}storejumaa`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jumaaDetails),
      });

      const result = await response.json();

      alert(result.message);
    } catch (error) {
      console.log("error:", error);
    }
      };

      return (
        <div>
          <label htmlFor="time-picker">Select Jumaa Time: </label>
          <select id="time-picker" value={selectedTime} onChange={handleTimeChange}>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="imam-name">Enter Imam Name: </label>
          <input
            type="text"
            id="imam-name"
            value={imamName}
            onChange={handleImamNameChange}
          />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      );
    };

  



export default JumaaTime;