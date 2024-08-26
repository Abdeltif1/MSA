import { useState, useEffect } from 'react';

export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState('');

  useEffect(() => {
    const getDateString = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = today.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const date = getDateString();
    const city = "Montreal";
    const country = "Canada";
    const method = "4";
    const adjustment = "1";

    setQueryParams(`${date}?city=${city}&country=${country}&method=${method}&adjustment=${adjustment}`);
  }, []);

  return queryParams;
};