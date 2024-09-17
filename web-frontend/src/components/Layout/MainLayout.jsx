import React, { useEffect, useState } from 'react';
// import Header from '../header/Header';

import { useQueryParams } from '../../hooks/useQueryParams';

import { ThemeProvider } from 'styled-components';

import Prayers from '../sections/prayers';

import Head from '../sections/Head';
import DailyPrayers from '../sections/DailyPrayers';
import Header from '../sections/Header';

import useTheme from '../../hooks/useTheme';



const MainLayout = () => {

  const [prayers, setPrayers] = useState(null);
  const queryParams = useQueryParams();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 430px)');

    // Function to handle screen size changes
    const handleScreenWidthChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    // Initial check
    handleScreenWidthChange(mediaQuery);

    // Add listener to detect changes in screen width
    mediaQuery.addEventListener('change', handleScreenWidthChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleScreenWidthChange);
  }, []);

  useEffect(() => {



    const fetchData = async () => {

      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;

        const url = `${baseUrl}dailydata${queryParams}`;

        const response = await fetch(url);
        const result = await response.json();

        setPrayers(result)
      }
      catch (error) {
        console.log('error:', error);
      }
    };

    if (queryParams) {
      fetchData();
    }

  }, [isSmallScreen, queryParams]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Header
        title="MSA Concordia - مصلى"
        imam="Mohamed Mohamed"
        date="21 August 2024, 17 Safar 1446"
        isSmallScreen={isSmallScreen}
      /> */}
      <Head isSmallScreen={isSmallScreen} />
      <DailyPrayers daily={prayers} />

    </ThemeProvider>
  );
};

export default MainLayout;
