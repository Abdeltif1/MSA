import { useState, useEffect } from 'react';

function useWeeklyCalendar() {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    const getFormattedDate = (date) => {
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    };

    const getDayName = (date) => {
      return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date); // Retrieve the day name based on locale
    };

    const buildWeekCalendar = () => {
      const weekArray = [];
      const currentDate = new Date();

      for (let i = 0; i < 7; i++) {
        const tempDate = new Date(currentDate);
        tempDate.setDate(currentDate.getDate() + i); // Add days dynamically
        weekArray.push({
          date: getFormattedDate(tempDate),
          name: getDayName(tempDate), // Dynamically get the day name
          data: {
            Fajr:  "Suleiman Latrch" ,
            Dhuhr:  "Suleiman Latrch" ,
            Asr:  "Suleiman Latrch" ,
            Maghrib: "Suleiman Latrch",
            Isha: "Suleiman Latrch",
          }
        });
      }

      setWeek(weekArray);
    };

    buildWeekCalendar();
  }, []);

  return week;
}

export default useWeeklyCalendar;








const week = [
    {
      date: "15-09-2024",
      name: "Sunday",
      data: {
        Fajr:  "Suleiman Latrch" ,
        Dhuhr:  "Suleiman Latrch" ,
        Asr:  "Suleiman Latrch" ,
        Maghrib: { Adan: "06:00", Iqama: "06:15", Imam: "Suleiman Latrch" },
        Isha: { Adan: "08:00", Iqama: "08:15", Imam: "Suleiman Latrch" },
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
