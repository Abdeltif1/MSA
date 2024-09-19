import React, { useState } from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBBtn } from "cdbreact";

export default function IqamaImamTable() {
  const [iqamaTimes, setIqamaTimes] = useState([
    { fajr: 5 },
    { dhuhr: 5 },
    { asr: 5 },
    { maghrib: 5 },
    { isha: 5 },
  ]);

  const handleIqamaTime = (choice, index) => {
    const selectedTime = parseInt(choice.target.value);
    setIqamaTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      const key = Object.keys(updatedTimes[index])[0];  
      updatedTimes[index] = { [key]: selectedTime };  
      return updatedTimes; 
    });
  };

  return (
    <CDBContainer>
      <CDBTable bordered>
        <CDBTableHeader>
          <tr>
            <th>Prayer</th>
            <th>Iqama (Time)</th>
          </tr>
        </CDBTableHeader>
        <CDBTableBody>
          {iqamaTimes.map((item, index) => {
            const prayer = Object.keys(item)[0]; 
            return (
              <tr key={index}>
                <td>
                  <strong>{prayer.charAt(0).toUpperCase() + prayer.slice(1)}</strong>
                </td>
                <td>
                  <select
                    name={`times-${prayer}`}
                    id={`times-${prayer}`}
                    value={item[prayer]}
                    onChange={(choice) => handleIqamaTime(choice, index)}
                  >
                    <option value={5}>5 mins</option>
                    <option value={10}>10 mins</option>
                    <option value={15}>15 mins</option>
                    <option value={20}>20 mins</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </CDBTableBody>
      </CDBTable>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <CDBBtn color="primary" onClick={() => console.log(iqamaTimes)}>
          Submit Iqama Times
        </CDBBtn>
      </div>
    </CDBContainer>
  );
}