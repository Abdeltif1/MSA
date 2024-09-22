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

     const fetchData = async () => {

        const baseUrl = process.env.REACT_APP_API_BASE_URL;

        const url = `${baseUrl}imams`;

        try{

        const response = await fetch(url);
        const data = await response.json();
        return data;
        }
        catch(error){
          console.error('Error fetching imams:', error);
        }
       
      }

    const buildWeekCalendar = (last_batch_imams) => {
      const weekArray = [];
      const currentDate = new Date();

     

      for (let i = 0; i < 7; i++) {
        const tempDate = new Date(currentDate);
        tempDate.setDate(currentDate.getDate() + i); // Add days dynamically
        weekArray.push({
          date: getFormattedDate(tempDate),
          name: getDayName(tempDate), // Dynamically get the day name
          data: {
            Fajr:  last_batch_imams[i].data.Fajr,
            Dhuhr:  last_batch_imams[i].data.Dhuhr, 
            Asr:  last_batch_imams[i].data.Asr, 
            Maghrib: last_batch_imams[i].data.Maghrib,
            Isha: last_batch_imams[i].data.Isha,
          }
        });
      }

      setWeek(weekArray);
    };

    fetchData().then((data) => {
      buildWeekCalendar(data);
    }).catch((error) => {
      console.error('Error:', error);
    });

  }, []);

  return week;
}

export default useWeeklyCalendar;








