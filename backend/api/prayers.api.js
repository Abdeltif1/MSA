const getPrayers = async (req, res) => {
    try {
        const { date, city, country, method, adjustment } = req.query;
        const apiUrl = `${process.env.PRAYER_URL_API}/${date}?city=${city}&country=${country}&method=${method}&adjustment=${adjustment}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            const prayers = await data.data.timings;
            const prayerArray = filterPrayerTimes(prayers);
            prayerArray.push(["Jumaa", prayerArray[1][1]]);
            res.status(200).json(prayerArray);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

const getJumaa = async (req, res) => {
    try {
        const { date, city, country, method, adjustment } = req.query;
        const apiUrl = `${process.env.PRAYER_URL_API}/${date}?city=${city}&country=${country}&method=${method}&adjustment=${adjustment}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            const jumaa = await data.data.timings.Dhuhr;
            res.status(200).json(jumaa);

        }
    }
    catch (err) {
        console.log(err);

    }
};

const getUpcomingPrayer = async (req, res) => {
    try {
        const { date, city, country, method, adjustment } = req.query;
        const apiUrl = `${process.env.PRAYER_URL_API}/${date}?city=${city}&country=${country}&method=${method}&adjustment=${adjustment}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            const prayers = await data.data.timings;
            const prayerArray = filterPrayerTimes(prayers);
            const timeStampsArr = timeStamps(prayerArray);
            const timeStamp = getCurrentTimestamp();


            const upcomingIndex = upcomingPrayerIndex(timeStampsArr, timeStamp);
            res.status(200).json(prayerArray[upcomingIndex]);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

const upcomingPrayerIndex = (prayers, currentTime) => {
    // Sort the array in ascending order
    prayers.sort((a, b) => a - b);

    for (let i = 0; i < prayers.length - 1; i++) {
        if (currentTime >= prayers[i] && currentTime <= prayers[i + 1]) {
            return i + 1;
        }
    }
    return 0;
}


const getCurrentTimestamp = () => {
    return Date.now();
}


const timeStamps = (timeStrings) => {
    return timeStrings.map(timeString => {
        const [hours, minutes] = timeString[1].split(':').map(Number);

        const now = new Date();

        now.setHours(hours, minutes, 0, 0);

        return now.getTime();
    });
}



const filterPrayerTimes = (prayerTimes) => {
    // Convert the object into an array of key-value pairs
    const entries = Object.entries(prayerTimes);

    // Exclude the last 4 elements and filter out the second (index 1) and fifth (index 4) elements
    const filteredEntries = entries
        .filter((_, index) => index !== 1 && index !== 4) // Exclude the second (index 1) and fifth (index 4) elements
        .slice(0, -4); // Exclude the last 4 elements

    // Return the filtered entries as an array of arrays
    return filteredEntries;
};




module.exports = { getPrayers, getJumaa, getUpcomingPrayer };