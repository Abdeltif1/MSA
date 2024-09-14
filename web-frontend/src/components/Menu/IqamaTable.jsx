import React, { useState } from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBBtn } from "cdbreact";

export default function IqamaImamTable() {
  const [iqamaTimes, setIqamaTime] = useState({
    Fajr: "5", // Default time
    Dhuhr: "5",
    Asr: "5",
    Maghrib: "5",
    Isha: "5",
  });
  //Make a function for the iqama time + prayer.

  const handleIqamaTime = (choice, prayer) => {
    const selectedTime = choice.target.value;
    setIqamaTime(selectedTime);
    console.log(selectedTime, prayer);
  };

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <CDBContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "150px",
        }}
      ></div>
      <CDBTable bordered>
        <CDBTableHeader>
          <tr>
            <th>Prayer</th>
            <th>Iqama (Time)</th>
          </tr>
        </CDBTableHeader>
        <CDBTableBody>
          {prayers.map((prayer, index) => (
            <tr key={index}>
              <td>
                <strong>{prayer}</strong>
              </td>
              <td>
                <select name="times" id="times" onChange={(choice) => handleIqamaTime(choice, prayer)}>
                  <option value="5">5 mins</option>
                  <option value="10">10 mins</option>
                  <option value="15">15 mins</option>
                  <option value="20">20 mins</option>
                </select>
              </td>
            </tr>
          ))}
        </CDBTableBody>
      </CDBTable>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <CDBBtn color="primary" >
          Submit Iqama Times
        </CDBBtn>
      </div>
    </CDBContainer>
  );
}
