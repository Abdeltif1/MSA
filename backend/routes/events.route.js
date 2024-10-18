
const express = require("express");

const {
    storeEvent,
    deleteEvent,
    getEvents,
    getEvent

} = require("../api/events.api");


const EventRouter = express.Router();


/**
 * @swagger
 * /api/events/storeevents:
 *   post:
 *     summary: Store Events
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
 *                   description: The date for which the events are being stored
 *                 title:
 *                   type: string
 *                   description: The name of the event
 *                 desc:
 *                   type: string
 *                   description: Description of the event
 *                 time:
 *                   type: string
 *                   description: The time of the event
 *                 location:
 *                   type: string
 *                   description: The location of the event
 *                 registration:
 *                   type: string
 *                   description: The registration link for the event
 *                 image:
 *                   type: string
 *                   description: The image for the event
 *             example:
 *               date: 09-24-2024
 *               title: BBQ
 *               desc: BBQ
 *               time: 1:00 PM
 *               location: MSA
 *               registration: https://www.msa.org
 *               image: https://www.msa.org/wp-content/uploads/2021/09/MSA-Logo-1.png
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

EventRouter.post("/storeevents", storeEvent);

/**
 * @swagger
 * /api/events/deleteevent:
 *   delete:
 *     summary: Delete Event
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: The date for which to delete the event
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
EventRouter.delete("/deleteevent", deleteEvent);



/**
 * @swagger
 * /api/events/allevents:
 *   get:
 *     summary: Get Events
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
EventRouter.get("/allevents", getEvents);

/**
 * @swagger
 * /api/events/event:
 *   get:
 *     summary: Get Event
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: The date for which to get the event
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
EventRouter.get("/event", getEvent)

module.exports = EventRouter;