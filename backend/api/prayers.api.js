const firebase = require("../firebase.js");


const {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
} = require('firebase/firestore');;

const weeklyPrayers = require("../data/prayers.js");
const imams = require("../data/imams.js");
const dailyPrayers = require("../data/daily.js");
const db = getFirestore(firebase);

/**
 * Store weekly prayers in the database
 * @param {*} req 
 * @param {*} res 
 */
const storeWeeklyPrayers = async (req, res) => {
  try {
    const docRef = doc(db, "prayers", "weekly");
    await setDoc(docRef, weeklyPrayers, { merge: true });
    res.status(200).send("Prayers added to database");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * store daily prayers in the database
 * @param {*} req 
 * @param {*} res 
 */
const storeDailyPrayers = async (req, res) => {
  try {

    // const daily = dailyPrayers ;
    const prayers = req.body;
    const docRef = doc(db, "prayers", "daily");
    // await setDoc(docRef, daily, { merge: true });
    await setDoc(docRef, prayers, { merge: true });

    res.status(200).send("Prayers added to database");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Store imams in the database.
 * Every imams will be updated in the database.
 * @param {*} req 
 * @param {*} res 
 */
const storeImams = async (req, res) => {

  try {
    // const imams = req.body;
    const docRef = doc(db, "prayers", "imams");
    await setDoc(docRef, imams, { merge: true });
    res.status(200).send("Imams are added to database");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

};

/**
 * Get daily prayers from the database
 * @param {*} req 
 * @param {*} res 
 */
const getDailyPrayers = async (req, res) => {

  try {
    const docRef = doc(db, "prayers", "daily");
    const response = await getDoc(docRef, daily);
    const prayerArray = convertObjectToArray(response.data());
    res.status(200).send(prayerArray);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

};


/**
 * Get jumaa prayer from the database
 * @param {*} req 
 * @param {*} res 
 */
const getJumaaPrayer = async (req, res) => {
  try {
    const docRef = doc(db, "prayers", "daily");
    const response = await getDoc(docRef);
    const jumaa = response.data().Jumaa;
    res.status(200).send(jumaa);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

};

/**
 * Get upcoming prayer based on data in db
 * @param {*} req 
 * @param {*} res 
 */
const getNextPrayer = async (req, res) => {

  try {
    const docRef = doc(db, "prayers", "daily");

    const response = await getDoc(docRef);

    const prayerArray = convertObjectToArray(response.data());

    //remove jumaa from the array
    prayerArray.pop();

    const timeStampsArr = getArrayOfTimeStamps(prayerArray);

    const timeStamp = getCurrentTimestamp();

    const upcomingIndex = upcomingPrayerIndex(timeStampsArr, timeStamp);

    res.status(200).json(prayerArray[upcomingIndex]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


/**
 * get imam from db
 * @param {day,prayer} req 
 * @param {*} res 
 */

const getImam = async (req, res) => {

  try {
    const { day, prayer } = req.query;
    const docRef = doc(db, "prayers", "imams");
    const response = await getDoc(docRef);
    const imamsData = response.data();
    const imam = imamsData[day][prayer];
    res.status(200).json(imam);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getJumaah = async (req, res) => {
  try {
    const { date, city, country, method, adjustment } = req.query;
    const apiUrl = `${process.env.PRAYER_URL_API}/${date}?city=${city}&country=${country}&method=${method}&adjustment=${adjustment}`;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const jumaa = await data.data.timings.Dhuhr;
      res.status(200).json(jumaa);
    }
  } catch (err) {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const upcomingPrayerIndex = (prayers, currentTime) => {
  // Sort the array in ascending order
  const sortedArray = prayers.sort((a, b) => a - b);

  for (let i = 0; i < sortedArray.length - 1; i++) {
    if (currentTime >= sortedArray[i] && currentTime <= sortedArray[i + 1]) {
      return i + 1;
    }
  }
  return 0;
};

const getCurrentTimestamp = () => {
  return Date.now();
};

const timeStamps = (timeStrings) => {
  return timeStrings.map((timeString) => {
    const [hours, minutes] = timeString[1].split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now.getTime();
  });
};



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


const convertObjectToArray = (obj) => {

  const arr = [
    ["Fajr", obj["Fajr"]],
    ["Dhuhr", obj["Dhuhr"]],
    ["Asr", obj["Asr"]],
    ["Maghrib", obj["Maghrib"]],
    ["Isha", obj["Isha"]],
    ["Jumaa", obj["Jumaa"]],
  ];

  return arr;
}

const getArrayOfTimeStamps = (timeStrings) => {

  console.log(timeStrings);
  return timeStrings.map((timeString) => {
    const [hours, minutes] = timeString[1].Iqama.split(":").map(Number);

    const now = new Date();

    now.setHours(hours, minutes, 0, 0);

    return now.getTime();
  });
};


module.exports = { getPrayers, getUpcomingPrayer, getJumaah, storeWeeklyPrayers, storeImams, storeDailyPrayers, getDailyPrayers, getJumaaPrayer, getNextPrayer, getImam };
