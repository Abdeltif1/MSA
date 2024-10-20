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
} = require('firebase/firestore');





const db = getFirestore(firebase);

const getImams = async (req, res) => {


  try {
    const docRef = doc(db, "prayers", "imams");
    const response = await getDoc(docRef);
    const imams = response.data().weekly_imams;
    res.status(200).json(imams);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }


}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getIqama = async (req, res) => {

  try {
    const docRef = doc(db, "prayers", "iqama");
    const response = await getDoc(docRef);
    const iqama = response.data().iqama_time;
    res.status(200).json(iqama);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}


/**
 * get daily prayers from the API and set iqama an imam
 * @param {*} req 
 * @param {*} res 
 */
const getDailyData = async (req, res) => {

  try {
    const { date, city, country, method, adjustment } = req.query;

    const apiUrl = `${process.env.PRAYER_URL_API}/${date}?city=${city}&country=${country}&method=${method}&adjustment=${adjustment}`;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();

      const prayers = await data.data.timings;

      const prayerArray = filterPrayerTimes(prayers);

      const iqamaArray = await getIqamaArray();


      const imamObj = await getImamObject(date);


      const prayerObject = getPrayerObject(prayerArray, iqamaArray.iqama_time, imamObj.data);

      res.status(200).send(prayerObject);

    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

};

// /**
//  * Store weekly prayers in the database
//  * @param {*} req 
//  * @param {*} res 
//  */
// const storeMyWeeklyPrayers = async (req, res) => {

//   try {
//     const { date, city, country, method, adjustment } = req.query;
//     const apiUrl = `${process.env.PRAYER_URL_API}/${weekly_dates[i].date}?city=${city}&country=${country}&method=${method}&adjustment=${adjustment}`;
//     const weekly_dates = getWeeklyDates(date);

//     for (let i = 0; i < weekly_dates.length; i++) {
//       const apiUrl = `${process.env.PRAYER_URL_API}/${weekly_dates[i].date}?city=${city}&country=${country}&method=${method}&adjustment=${adjustment}`;
//       const response = await fetch(apiUrl);
//       if (response.ok) {
//         const data = await response.json();

//         const prayers = await data.data.timings;

//         const prayerArray = filterPrayerTimes(prayers);

//         const prayerObject = getPrayerObject(prayerArray);

//         weekly_dates[i].data = prayerObject;
//         if (weekly_dates[i].day === "Friday") {
//           weekly_dates[i].data.dhuhr.Khutba = "13:20";
//         }
//       }
//     }

//     const docRef = doc(db, "prayers", "my_week");
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const existingData = docSnap.data().weekly_dates || [];
//       // const updatedData = [...existingData, ...weekly_dates];
//       await setDoc(docRef, { weekly_dates: weekly_dates }, { merge: true });
//     } else {
//       await setDoc(docRef, { weekly_dates }, { merge: true });
//     }
//     res.status(200).send("Prayers added to database");

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// }

/**
 * Store weekly prayers in the database
 * @param {*} req 
 * @param {*} res 
 */
// const storeWeeklyPrayers = async (req, res) => {
//   try {
//     const docRef = doc(db, "prayers", "weekly");
//     await setDoc(docRef, weeklyPrayers, { merge: true });
//     res.status(200).send("Prayers added to database");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };

/**
 * store daily prayers in the database
 * @param {*} req 
 * @param {*} res 
 */
// const storeDailyPrayers = async (req, res) => {
//   try {

//     // const daily = dailyPrayers ;
//     const prayers = req.body;
//     const docRef = doc(db, "prayers", "daily");
//     // await setDoc(docRef, daily, { merge: true });
//     await setDoc(docRef, prayers, { merge: true });

//     res.status(200).send("Prayers added to database");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };

/**
 * Store imams in the database.
 * Every imams will be updated in the database.
 * @param {*} req 
 * @param {*} res 
 */
const storeImams = async (req, res) => {

  try {
    const imams = req.body;
    const docRef = doc(db, "prayers", "imams");

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data().weekly_imams || [];
      // const updatedData = [...existingData, ...weekly_dates];
      await setDoc(docRef, { weekly_imams: imams }, { merge: true });
    } else {
      await setDoc(docRef, { imams }, { merge: true });
    }
    res.status(200).json({ message: "Imams are added to database" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

};

const storeIqama = async (req, res) => {

  try {
    const iqama = req.body;

    const docRef = doc(db, "prayers", "iqama");

    const docSnap = await getDoc(docRef);

    await setDoc(docRef, { iqama_time: iqama }, { merge: true });

    res.status(200).json({ message: "Iqama Time are added to the database" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }


}

/**
 * Get daily prayers from the database
 * @param {*} req 
 * @param {*} res 
 */
const getDailyPrayers = async (req, res) => {

  try {
    const docRef = doc(db, "prayers", "daily");
    const response = await getDoc(docRef);
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
    const docRef = doc(db, "prayers", "jumaa");
    const response = await getDoc(docRef);
    const jumaa = response.data();
    res.status(200).json(jumaa);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

};

const storeJumaaPrayer = async (req, res) => {
  try {
    const jumaaPrayer = req.body;
    const docRef = doc(db, "prayers", "jumaa");
    await setDoc(docRef, jumaaPrayer, { merge: true });
    res.status(200).json({ message: "Jumaa prayer added to database" });
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
// const getNextPrayer = async (req, res) => {

//   try {
//     const docRef = doc(db, "prayers", "daily");

//     const response = await getDoc(docRef);

//     const prayerArray = convertObjectToArray(response.data());

//     //remove jumaa from the array
//     prayerArray.pop();

//     const timeStampsArr = getArrayOfTimeStamps(prayerArray);

//     const timeStamp = getCurrentTimestamp();

//     const upcomingIndex = upcomingPrayerIndex(timeStampsArr, timeStamp);

//     res.status(200).json(prayerArray[upcomingIndex]);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };


/**
 * get imam from db
 * @param {day,prayer} req 
 * @param {*} res 
 */
const getImam = async (req, res) => {

  try {
    const { day, prayer } = req.query;

    const imam = await getImamObject(day);

    res.status(200).json(imam.data[prayer]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// const getPrayers = async (req, res) => {
//   try {
//     const { date, city, country, method, adjustment } = req.query;
//     const apiUrl = `${process.env.PRAYER_URL_API}/${date}?city=${city}&country=${country}&method=${method}&adjustment=${adjustment}`;
//     const response = await fetch(apiUrl);
//     if (response.ok) {
//       const data = await response.json();
//       const prayers = await data.data.timings;
//       const prayerArray = filterPrayerTimes(prayers);
//       const iqamas = await getIqamaArray();
//       for (let i = 0; i < prayerArray.length; i++) {

//         console.log(iqamas);
//         const iqama = evaluateIqamaTime(prayerArray[i][1], iqamas.iqama_time[i]);
//         prayerArray[i].push(iqama);
//       }
//       prayerArray.push(["Jumaa", prayerArray[1][1]]);
//       res.status(200).json(prayerArray);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };


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
      const iqamas = await getIqamaArray();

      const upcoming = prayerArray[upcomingIndex];

      const upcomingIqama = evaluateIqamaTime(upcoming[1], iqamas.iqama_time[upcomingIndex][upcoming[0]]);

      const imamObj = await getImamObject(date);


      const imam = imamObj.data[upcoming[0]];



      upcoming.push(upcomingIqama);

      upcoming.push(imam);

      res.status(200).json(upcoming);
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



const getPrayerObject = (prayers, iqamaObj, imamObj) => {



  const prayerObject = {
    Fajr: { adan: prayers[0][1], iqama: evaluateIqamaTime(prayers[0][1], iqamaObj[0].Fajr), imam: imamObj.Fajr },
    Dhuhr: { adan: prayers[1][1], iqama: evaluateIqamaTime(prayers[1][1], iqamaObj[1].Dhuhr), imam: imamObj.Dhuhr },
    Asr: { adan: prayers[2][1], iqama: evaluateIqamaTime(prayers[2][1], iqamaObj[2].Asr), imam: imamObj.Asr },
    Maghrib: { adan: prayers[3][1], iqama: evaluateIqamaTime(prayers[3][1], iqamaObj[3].Maghrib), imam: imamObj.Maghrib },
    Isha: { adan: prayers[4][1], iqama: evaluateIqamaTime(prayers[4][1], iqamaObj[4].Isha), imam: imamObj.Isha },
  };
  return prayerObject;
}

const getIqamaArray = async () => {
  const docRef = doc(db, "prayers", "iqama");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const iqamas = docSnap.data();
    return iqamas;
  } else {
    throw new Error("Iqama times not found in the database");
  }
}


const getImamObject = async (day) => {
  const docRef = doc(db, "prayers", "imams");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    const imams = docSnap.data();

    const imamObjectForDate = findItem(imams.weekly_imams, day);

    return imamObjectForDate;
  } else {
    throw new Error("Imams  not found in the database");
  }


}

const evaluateIqamaTime = (prayerTime, iqama) => {
  // const iqamaTime = Object.values(iqama)[0];
  // console.log(prayerTime);
  // console.log(iqama);
  const [hours, minutes] = prayerTime.split(":").map(Number);
  let date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);



  date.setMinutes(date.getMinutes() + iqama);

  let newHours = String(date.getHours()).padStart(2, '0');
  let newMinutes = String(date.getMinutes()).padStart(2, '0');

  let newTime = `${newHours}:${newMinutes}`;

  return newTime;

};

const findItem = (arr, target) => {

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].date === target) {

      return arr[i];
    }
  }


};


module.exports = {
  getImams,
  // getPrayers,
  getUpcomingPrayer,
  // storeWeeklyPrayers,
  storeImams,
  // storeDailyPrayers,
  getDailyPrayers,
  getJumaaPrayer,
  // getNextPrayer,
  getImam,
  // storeMyWeeklyPrayers,
  storeIqama,
  getDailyData,
  storeJumaaPrayer,
  getIqama,
};
