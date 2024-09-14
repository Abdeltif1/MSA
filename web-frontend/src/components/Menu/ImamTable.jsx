import React, { useState } from "react";
import {
  CDBTable,
  CDBTableHeader,
  CDBTableBody,
  CDBContainer,
  CDBBtn,
  CDBInput
} from "cdbreact";

export default function IqamaImamTable() {
  const week = [
    {
      date: "15-09-2024",
      name: "Sunday",
      data: {
        fajr: { Adan: "05:00", Iqama: "05:10", Imam: "Suleiman Latrch" },
        dhuhr: { Adan: "12:00", Iqama: "13:15", Imam: "Suleiman Latrch" },
        asr: { Adan: "03:00", Iqama: "03:15", Imam: "Suleiman Latrch" },
        maghrib: { Adan: "06:00", Iqama: "06:15", Imam: "Suleiman Latrch" },
        isha: { Adan: "08:00", Iqama: "08:15", Imam: "Suleiman Latrch" },
      },
    },
    {
      "16-09-2024": {
        name: "Monday",
        Prayers: {
          Fajr: { Adan: "05:00", Iqama: "05:10", Imam: "Suleiman Latrch" },
          Dhuhr: { Adan: "12:00", Iqama: "13:15", Imam: "Suleiman Latrch" },
          Asr: { Adan: "03:00", Iqama: "03:15", Imam: "Suleiman Latrch" },
          Maghrib: { Adan: "06:00", Iqama: "06:15", Imam: "Suleiman Latrch" },
          Isha: { Adan: "08:00", Iqama: "08:15", Imam: "Suleiman Latrch" },
        },
      },
    },
    {
      date: "17-09-2024",
      name: "Tuesday",
      data: {
        Fajr: { Adan: "05:00", Iqama: "05:10", Imam: "Badr Moussa" },
        Dhuhr: { Adan: "12:00", Iqama: "12:15", Imam: "Badr Moussa" },
        Asr: { Adan: "03:00", Iqama: "03:15", Imam: "Badr Moussa" },
        Maghrib: { Adan: "06:00", Iqama: "06:15", Imam: "Badr Moussa" },
        Isha: { Adan: "08:00", Iqama: "08:15", Imam: "Badr Moussa" },
      },
    },
    {
      date: "18-10-2024",
      name: "Wednesday",
      data: {
        Fajr: { Adan: "05:00", Iqama: "05:10", Imam: "Mohamed Saidi" },
        Dhuhr: { Adan: "12:00", Iqama: "12:15", Imam: "Mohamed Saidi" },
        Asr: { Adan: "03:00", Iqama: "03:15", Imam: "Mohamed Saidi" },
        Maghrib: { Adan: "06:00", Iqama: "06:15", Imam: "Mohamed Saidi" },
        Isha: { Adan: "08:00", Iqama: "08:15", Imam: "Mohamed Saidi" },
      },
    },
    {
      date: "19-10-2024",
      name: "Thursaday",
      data: {
        Fajr: { Adan: "05:00", Iqama: "05:10", Imam: "Mohamed Saidi" },
        Dhuhr: { Adan: "12:00", Iqama: "12:15", Imam: "Mohamed Saidi" },
        Asr: { Adan: "03:00", Iqama: "03:15", Imam: "Mohamed Saidi" },
        Maghrib: { Adan: "06:00", Iqama: "06:15", Imam: "Mohamed Saidi" },
        Isha: { Adan: "08:00", Iqama: "08:15", Imam: "Mohamed Saidi" },
      },
    },
    {
      date: "20-10-2024",
      name: "Friday",
      data: {
        Fajr: { Adan: "05:00", Iqama: "05:10", Imam: "Mohamed Saidi" },
        Dhuhr: {
          Adan: "12:00",
          Iqama: "12:15",
          Imam: "Mohamed Saidi",
          Khutba: "13:00",
        },
        Asr: { Adan: "03:00", Iqama: "03:15", Imam: "Mohamed Saidi" },
        Maghrib: { Adan: "06:00", Iqama: "06:15", Imam: "Mohamed Saidi" },
        Isha: { Adan: "08:00", Iqama: "08:15", Imam: "Mohamed Saidi" },
      },
    },
    {
      date: "21-10-2024",
      name: "Saturday",
      data: {
        Fajr: { Adan: "05:00", Iqama: "05:10", Imam: "Mohamed Saidi" },
        Dhuhr: { Adan: "12:00", Iqama: "12:15", Imam: "Mohamed Saidi" },
        Asr: { Adan: "03:00", Iqama: "03:15", Imam: "Mohamed Saidi" },
        Maghrib: { Adan: "06:00", Iqama: "06:15", Imam: "Mohamed Saidi" },
        Isha: { Adan: "08:00", Iqama: "08:15", Imam: "Mohamed Saidi" },
      },
    },
  ];

  const prayers = ["fajr", "Duhr", "Asr", "Maghrib", "Ishaa"];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satuday",
  ];

  const [currentWeek, setCurrentWeek] = useState(0);

  const nextWeek = () => setCurrentWeek(currentWeek + 1);
  const prevWeek = () => setCurrentWeek(currentWeek - 1);

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
            {daysOfWeek.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </CDBTableHeader>
        <CDBTableBody>
          {prayers.map((prayer, index) => (
            <tr key={index}>
              <td>
                <strong>{prayer}</strong>
              </td>
              {daysOfWeek.map((day) => (
                <td key={day}>
                  <div>
                    <p>Adhan: </p>
                    <label>
                      Imam: <CDBInput background color="primary" type="text" />
                    </label>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </CDBTableBody>
      </CDBTable>
    </CDBContainer>
  );
}
