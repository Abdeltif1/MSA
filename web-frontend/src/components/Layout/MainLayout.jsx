import React, { useEffect, useState } from 'react';
// import Header from '../header/Header';

import { ThemeProvider } from 'styled-components';

import Prayers from '../sections/prayers';
import Header from '../sections/Header';

import useTheme from '../../hooks/useTheme';



const MainLayout = () => {
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

  return (
    <ThemeProvider theme={theme}>
      <Header
        title="MSA Concordia - مصلى"
        time="00:00"
        imam="Mohamed Mohamed"
        date="21 August 2024, 17 Safar 1446"
        isSmallScreen={isSmallScreen}
      />
      <Prayers isSmallScreen={isSmallScreen} />

    </ThemeProvider>
  );
};






export default MainLayout;
