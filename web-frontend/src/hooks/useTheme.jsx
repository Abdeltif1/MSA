import { useState, useEffect } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState({});

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour >= 3 && currentHour < 6) {
            // Sunrise theme
            setTheme({
                background: 'linear-gradient(to bottom,  rgba(255, 220, 165, 0.5) 0%, rgba(255, 204, 157, 0.5) 100%)',
                textColor: '#000',
                globalBackground: 'linear-gradient(to bottom, #82ADDB, #FCE4E4);',
                path: "SunRiseSun.png",
            });
        } else if (currentHour >= 6 && currentHour < 18) {
            // Daytime theme
            setTheme({
                background: ' linear-gradient(to bottom, #F7F274 0%, rgba(236, 255, 245, 0.2) 100%)',
                textColor: '#000',
                globalBackground: 'linear-gradient(to bottom, #B7EAFF, #94DFFF)',
                path: "Sun.png",
            });
        } else if (currentHour >= 18 && currentHour < 22) {
            // Sunset theme
            setTheme({
                background: 'linear-gradient(to bottom, rgba(255, 220, 165, 0.5) 0%, rgba(255, 204, 157, 0.5) 100%)',
                textColor: '#000',
                globalBackground: 'linear-gradient(to bottom, #163C52 0%, #4F4F47 30%, #C5752D 60%, #B7490F 80%, #2F1107 100%)',
                path: "SunSetSun.png",
            });
        } else {
            // Nighttime theme
            setTheme({
                background: 'linear-gradient(to bottom, #8C82FF,  rgba(236, 255, 245, 0.2) 100%)',
                textColor: '#fff',
                globalBackground: 'linear-gradient(to bottom, #090401 50%, #3F2A4C)',
                path: "Moon.png",
            });
        }
    }, []);

    return theme;
};

export default useTheme;

//web-frontend\src\assets\images\SunRiseSun.png