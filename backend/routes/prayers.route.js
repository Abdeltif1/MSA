const express = require("express");

const { getPrayers, getJumaah, getUpcomingPrayer, storePrayers } = require("../api/prayers.api");


const PrayerRouter = express.Router();

PrayerRouter.get("/dailyprayers", getPrayers);

PrayerRouter.get("/jumaaprayer", getJumaah);

PrayerRouter.get("/upcomingprayer", getUpcomingPrayer);

PrayerRouter.post("/storeprayers", storePrayers);


module.exports = PrayerRouter;