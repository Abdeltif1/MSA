
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
    storeMyWeeklyPrayers,
    storeIqama,
    getDailyData
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
/**
 * @swagger
 * /api/prayers/storeimams:
 *   post:
 *     summary: Store imams
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   description: The date for which the imams are being stored
 *                 name:
 *                   type: string
 *                   description: The name of the day
 *                 data:
 *                   type: object
 *                   description: The prayer times and corresponding imams
 *                   properties:
 *                     Fajr:
 *                       type: string
 *                     Dhuhr:
 *                       type: string
 *                     Asr:
 *                       type: string
 *                     Maghrib:
 *                       type: string
 *                     Isha:
 *                       type: string
 *               example:
 *                 date: "09-14-2024"
 *                 name: "Saturday"
 *                 data: 
 *                   Fajr: "Tarek Barake"
 *                   Dhuhr: "Tarek Barake"
 *                   Asr: "Suleiman Latrch"
 *                   Maghrib: "Suleiman Latrch"
 *                   Isha: "Suleiman Latrch"
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



/**
 * @swagger
 * /api/prayers/storemyweeklyprayers:
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

PrayerRouter.get("/storemyweeklyprayers", storeMyWeeklyPrayers);

/**
 * @swagger
 * /api/prayers/storeiqama:
 *   post:
 *     summary: Store iqama
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prayerData:
 *                 type: object
 *                 description: The iqama data to be stored
 *             example:
 *               [
 *                 { fajr: 5 },
 *                 { dhuhr: 12 },
 *                 { asr: 15 },
 *                 { maghrib: 6 },
 *                 { isha: 8 }
 *               ]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */


PrayerRouter.post("/storeIqama", storeIqama);




/**
 * @swagger
 * /api/prayers/dailydata:
 *  get:
 *   summary: Get Daily Prayer Data
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

PrayerRouter.get("/dailydata", getDailyData);


module.exports = PrayerRouter;