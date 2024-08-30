const express = require("express");

const { getPrayers, getJumaa, getUpcomingPrayer } = require("../api/prayers.api");


const router = express.Router();

router.get("/dailyprayers", getPrayers);

router.get("/jumaaprayer", getJumaa);

router.get("/upcomingprayer", getUpcomingPrayer);


module.exports = router;