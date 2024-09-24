import React, { useState, useEffect } from "react";
import {
  CDBTable,
  CDBTableHeader,
  CDBTableBody,
  CDBContainer,
  CDBBtn,
} from "cdbreact";


export default function IqamaImamTable() {
  const [iqamaTimes, setIqamaTimes] = useState([]);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;

        const url = `${baseUrl}iqama`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        setIqamaTimes(result);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();

  }, []);

  const handleIqamaTime = (choice, index) => {
    const selectedTime = parseInt(choice.target.value);
    setIqamaTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      const key = Object.keys(updatedTimes[index])[0];
      updatedTimes[index] = { [key]: selectedTime };

      return updatedTimes;
    });
  };

  const storeIqamaTime = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const url = `${baseUrl}storeIqama`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(iqamaTimes),
      });

      const result = await response.json();

      alert(result.message);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    
    <CDBContainer>
      <h1>Iqama Management</h1>
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
                  <strong>
                    {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                  </strong>
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
        <CDBBtn
          color="primary"
          onClick={() => {
            storeIqamaTime();
          }}
        >
          Submit Iqama Times
        </CDBBtn>
      </div>
    </CDBContainer>
  );
}
