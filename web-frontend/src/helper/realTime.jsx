import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';


export const test = (col, docu) =>{
    onSnapshot(doc(db, col, docu), (doc) => {
        console.log("Current data: ", doc.data());
    });
    
}