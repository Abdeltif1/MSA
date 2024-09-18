import React, { useEffect, useState } from 'react';
// import Header from '../header/Header';

import { ThemeProvider } from 'styled-components';
import moment from 'moment-hijri';
import Prayers from '../sections/prayers';
import Header from '../sections/Header';

import useTheme from '../../hooks/useTheme';



const MainLayout = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');

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
    const gregorianDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const hijriDateFormatted = moment().format('iD iMMMM iYYYY');

    setCurrentDate(gregorianDate);
    setHijriDate(hijriDateFormatted);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header
        title="MSA Concordia - مصلى"
        time="00:00"
        imam="Mohamed Mohamed"
        date={`${currentDate}, ${hijriDate}`}
        isSmallScreen={isSmallScreen}
      />
      <Prayers isSmallScreen={isSmallScreen} />

    </ThemeProvider>
  );
};






export default MainLayout;
