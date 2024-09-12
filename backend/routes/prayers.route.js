
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

/**
 * @swagger
 * /api/prayers/dailyprayers:
 *   get:
 *     summary: Get daily prayers
 *     description: Retrieves the daily prayers for a specific date, city, country, calculation method, and adjustment value.
 *     parameters:
 *       - name: date
 *         in: query
 *         description: The date for which to retrieve the daily prayers
 *         required: true
 *         schema:
 *           type: string
 *       - name: city
 *         in: query
 *         description: The city for which to retrieve the daily prayers
 *         required: true
 *         schema:
 *           type: string
 *       - name: country
 *         in: query
 *         description: The country for which to retrieve the daily prayers
 *         required: true
 *         schema:
 *           type: string
 *       - name: method
 *         in: query
 *         description: The calculation method for prayer times
 *         required: true
 *         schema:
 *           type: string
 *       - name: adjustment
 *         in: query
 *         description: The adjustment value for prayer times
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

PrayerRouter.get("/dailyprayers", getPrayers);

/**
 * @swagger
 * /api/prayers/jumaahprayer:
 *   get:
 *     summary: Get Jumaah prayer
 *     parameters:
 *       - name: date
 *         in: query
 *         description: The date for which to retrieve the Jumaah prayer
 *         required: true
 *         schema:
 *           type: string
 *       - name: city
 *         in: query
 *         description: The city for which to retrieve the Jumaah prayer
 *         required: true
 *         schema:
 *           type: string
 *       - name: country
 *         in: query
 *         description: The country for which to retrieve the Jumaah prayer
 *         required: true
 *         schema:
 *           type: string
 *       - name: method
 *         in: query
 *         description: The calculation method for prayer times
 *         required: true
 *         schema:
 *           type: string
 *       - name: adjustment
 *         in: query
 *         description: The adjustment value for prayer times
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

PrayerRouter.get("/jumaahprayer", getJumaah);


/**
 * @swagger
 * /api/prayers/upcomingprayer:
 *  get:
 *   summary: Get upcoming prayer
 *   parameters:
 *     - name: date
 *       in: query
 *       description: The date for which to retrieve the upcoming prayer
 *       required: true
 *       schema:
 *         type: string
 *     - name: city
 *       in: query
 *       description: The city for which to retrieve the upcoming prayer
 *       required: true
 *       schema:
 *         type: string
 *     - name: country
 *       in: query
 *       description: The country for which to retrieve the upcoming prayer
 *       required: true
 *       schema:
 *         type: string
 *     - name: method
 *       in: query
 *       description: The calculation method for prayer times
 *       required: true
 *       schema:
 *         type: string
 *     - name: adjustment
 *       in: query
 *       description: The adjustment value for prayer times
 *       required: true
 *       schema:
 *         type: number
 *         format: double
 *         minimum: -24
 *         maximum: 24
 *   responses:
 *     200:
 *       description: Success
 *     500:
 *       description: Internal server error
 */
PrayerRouter.get("/upcomingprayer", getUpcomingPrayer);

/**
 * @swagger
 * /api/prayers/nextprayer:
 *   get:
 *     summary: Get next prayer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */


PrayerRouter.get("/nextprayer", getNextPrayer);


/**
 * @swagger
 * /api/prayers/jumaaprayer:
 *   get:
 *     summary: Get Jumaah prayer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

PrayerRouter.get("/jumaaprayer", getJumaaPrayer);


/**
 * @swagger
 * /api/prayers/daily:
 *   get:
 *     summary: Get daily prayers
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
PrayerRouter.get("/daily", getDailyPrayers);


/**
 * @swagger
 * /api/prayers/imam:
 *   get:
 *     summary: Get imam
 *     parameters:
 *       - name: day
 *         in: query
 *         description: The day for which to retrieve the imam
 *         required: true
 *         schema:
 *           type: string
 *       - name: prayer
 *         in: query
 *         description: The prayer for which to retrieve the imam
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
PrayerRouter.get("/imam", getImam);

/**
 * @swagger
 * /api/prayers/storeweeklyprayers:
 *   post:
 *     summary: Store weekly prayers
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

PrayerRouter.post("/storeweeklyprayers", storeWeeklyPrayers);

/**
 * @swagger
 * /api/prayers/storeimams:
 *   post:
 *     summary: Store imams
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

PrayerRouter.post("/storeimams", storeImams);


/**
 * @swagger
 * /api/prayers/storedailyprayers:
 *   post:
 *     summary: Store daily prayers
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prayerData:
 *                 type: object
 *                 description: The daily prayer data to be stored
 *             example:
 *               {
 *                 "Fajr": { "Adan": "05:35", "Iqama": "05:40" },
 *                 "Dhuhr": { "Adan": "13:16", "Iqama": "13:20" },
 *                 "Asr": { "Adan": "16:50", "Iqama": "16:55" },
 *                 "Maghrib": { "Adan": "19:36", "Iqama": "19:40" },
 *                 "Isha": { "Adan": "20:56", "Iqama": "21:00" },
 *                 "Jumaa": { "Adan": "13:16", "Iqama": "13:15" }
 *               }
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

PrayerRouter.post("/storedailyprayers", storeDailyPrayers);




module.exports = PrayerRouter;