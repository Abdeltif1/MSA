const getPrayers = async (req, res) => {
    try{
        const url = process.env.PRAYER_API_URL;
        const response = await fetch(url);
        if(response.ok){
            const data =await response.json();
            const prayers = await data.data.timings;
            res.status(200).json(prayers);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const getCurrentTimestamp = () => {
    return Date.now();
}

const getUpcomingPrayer = async (req, res) => {
    try{
        const url = process.env.PRAYER_API_URL;
        
        const response = await fetch(url);
        if(response.ok){
            const data =await response.json();
            const prayers = await data.data.timings;
            const prayerArray = filterPrayerTimes(prayers);
            const prayerArrStrings= prayerArray.map(timeObj => Object.values(timeObj)[0]);
            const timeStampsArr = timeStamps(prayerArrStrings);
            const timeStamp = getCurrentTimestamp();
            console.log(timeStamp);
            console.log(timeStampsArr);
          
            const upcomingIndex = upcomingPrayerIndex(timeStampsArr, timeStamp);
            res.status(200).json(prayerArray[upcomingIndex]);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const upcomingPrayerIndex = (prayers, currentTime) => {
        // Sort the array in ascending order
        prayers.sort((a, b) => a - b);

        for (let i = 0; i < prayers.length - 1; i++) {
            if (currentTime >= prayers[i] && currentTime <= prayers[i + 1]) {
                return i+1;
            }
        }
        return 0;
}



const getJumaa = async(req, res) => {
    try{
        const url = process.env.PRAYER_API_URL;
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            const jumaa = await data.data.timings.Dhuhr;
            res.status(200).json(jumaa);
            
        }
    }
    catch(err){
        console.log(err);
        
    }
};

const timeStamps = (timeStrings) => {
    return timeStrings.map(timeString => {
        const [hours, minutes] = timeString.split(':').map(Number);

        const now = new Date();

        now.setHours(hours, minutes, 0, 0);

        return now.getTime();
    });
}

const filterPrayerTimes = (prayerTimes) => {
    // Convert the object into an array of key-value pairs
    const entries = Object.entries(prayerTimes);
    
    // Exclude the last 4 elements
    const filteredEntries = entries
        .slice(0, -4) // Exclude the last 4 elements
        .filter((_, index) => index !== 1 && index !== 4); // Exclude the second (index 1) and fifth (index 4) elements
    

    
    // Convert the filtered entries back into an array of objects
    return filteredEntries.map(([key, value]) => ({ [key]: value }));
}




module.exports = {getPrayers, getJumaa, getUpcomingPrayer};