const express = require("express");

const { getPrayers } = require("../api/prayers.api");

const router = express.Router();

router.get("/dailyprayers", getPrayers);


module.exports = router;