
import { initializeApp } from "firebase/app"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCThfzGcAUFMydkjfrn1oOZBBXWz7zqcVU",
    authDomain: "softwareeng-5d860.firebaseapp.com",
    databaseURL: "https://softwareeng-5d860-default-rtdb.firebaseio.com",
    projectId: "softwareeng-5d860",
    storageBucket: "softwareeng-5d860.appspot.com",
    messagingSenderId: "293373909046",
    appId: "1:293373909046:web:d39fa833d01c50176ca097",
    measurementId: "G-067B9NFCG4"
}


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


export{
    db
}