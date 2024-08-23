const express = require("express");

const { getPrayers, getJumaa } = require("../api/prayers.api");

const router = express.Router();

router.get("/dailyprayers", getPrayers);

router.get("/jumaaprayer", getJumaa);


module.exports = router;