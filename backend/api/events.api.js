//Maybe will use firebase after the meeting. 
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


const all_events = require("../data/events.js");

const db = getFirestore(firebase);


const getEvent = async (req, res) => {
    try {
        const { date } = req.query;

        const docRef = doc(db, "events", "all_events");

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const events = docSnap.data().all_events || [];
            const event = events.find((event) => event.date === date);
            if (event) {
                res.status(200).json(event);
            } else {
                res.status(404).json({ message: "Event not found" });
            }
        } else {
            res.status(404).json({ message: "Events not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}


const getEvents = async (req, res) => {
    try {
        const docRef = doc(db, "events", "all_events");

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            res.status(200).json(docSnap.data());
        } else {
            res.status(404).json({ message: "Events not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const storeEvent = async (req, res) => {

    try {
        const newEvent = req.body;
        const docRef = doc(db, "events", "all_events");

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const existingEvents = docSnap.data().all_events || [];
            existingEvents.push(newEvent);
            await setDoc(docRef, { all_events: existingEvents }, { merge: true });
        } else {
            await setDoc(docRef, { all_events: [newEvent] }, { merge: true });
        }
        res.status(200).json({ message: "Event added to database" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { date } = req.query;

        const docRef = doc(db, "events", "all_events");

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const existingEvents = docSnap.data().all_events || [];
            const newEvents = existingEvents.filter((event) => event.date !== date);
            await setDoc(docRef, { all_events: newEvents }, { merge: true });
            res.status(200).json({ message: "Event deleted" });
        } else {
            res.status(404).json({ message: "Events not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    storeEvent,
    deleteEvent,
    getEvents,
    getEvent

};