import React, { useEffect, useState } from "react";
import {
  CDBTable,
  CDBTableHeader,
  CDBTableBody,
  CDBContainer,
  CDBBtn,
  CDBInput
} from "cdbreact";

import useWeeklyCalendar from "../../hooks/useWeeklyCalendar";

export default function IqamaImamTable() {
  const weekly = useWeeklyCalendar();
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  const [myWeek, setMyWeek] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);

  const nextWeek = () => setCurrentWeek(currentWeek + 1);
  const prevWeek = () => setCurrentWeek(currentWeek - 1);

  useEffect(() => {
    setMyWeek(weekly);
  }, [weekly]);



    // Update the value of a specific prayer for a specific day
    const handleInputChange = (dayIndex, prayer, value) => {
      setMyWeek(prevState =>
        prevState.map((day, i) =>
          i === dayIndex ? { ...day, data: { ...day.data, [prayer]: value } } : day
        )
      );
    };
  // Handle form submission
  const handleSubmit = async () => {

    try{
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    const url = `${baseUrl}storeimams`;

    const response =  await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(myWeek), 
    });
    
    const result = await response.json();

    
    alert(result.message)
  } catch (error) {
    console.log("error:", error);
  }
  };


  return (
    <CDBContainer>
      <h3>Imam for week {currentWeek + 1}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "150px",
        }}
      >
        <CDBBtn
          color="secondary"
          onClick={prevWeek}
          disabled={currentWeek === 0}
        >
          Previous
        </CDBBtn>
        <CDBBtn color="secondary" onClick={nextWeek}>
          Next
        </CDBBtn>
      </div>
      <CDBTable bordered>
        <CDBTableHeader>
          <tr>
            <th>#</th>
            {prayers.map((prayer, index) => (
              <th key={index}>{prayer}</th>
            ))}
          </tr>
        </CDBTableHeader>
        <CDBTableBody>
          {myWeek.map((day, index) => (
            <tr key={index}>
              <td>
                <strong>{day.name}<br /> {day.date}</strong>
              </td>
              {prayers.map((prayer, i) => (
                <td key={i}>
                  <div>
                    <label>
                      Imam: <CDBInput background color="primary" type="text" value={day.data[prayer]}  onChange={(e) =>
                          handleInputChange(index, prayer, e.target.value)
                        } />
                    </label>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </CDBTableBody>
      </CDBTable>
      <CDBBtn color="primary" onClick={handleSubmit}>
        Submit
      </CDBBtn>
    </CDBContainer>
  );
}
