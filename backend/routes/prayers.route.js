const express = require("express");

const {
    getPrayers,
    getJumaah,
    getUpcomingPrayer,
    storeWeeklyPrayers,
    storeImams,
    storeDailyPrayers,
    getDailyPrayers,
    getJumaaPrayer,
    getNextPrayer,
    getImam,
} = require("../api/prayers.api");


const PrayerRouter = express.Router();

PrayerRouter.get("/dailyprayers", getPrayers);

PrayerRouter.get("/jumaahprayer", getJumaah);

PrayerRouter.get("/upcomingprayer", getUpcomingPrayer);

PrayerRouter.get("/nextprayer", getNextPrayer);

PrayerRouter.get("/jumaaprayer", getJumaaPrayer);

PrayerRouter.get("/daily", getDailyPrayers);

PrayerRouter.get("/imam", getImam);

PrayerRouter.post("/storeweeklyprayers", storeWeeklyPrayers);

PrayerRouter.post("/storeimams", storeImams);

PrayerRouter.post("/storedailyprayers", storeDailyPrayers);




module.exports = PrayerRouter;