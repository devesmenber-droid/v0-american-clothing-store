import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyA6UbPxktykBO7Le6oMSwNErJT-7GARGPY",
  authDomain: "banco-de-dados-fba27.firebaseapp.com",
  projectId: "banco-de-dados-fba27",
  storageBucket: "banco-de-dados-fba27.firebasestorage.app",
  messagingSenderId: "993017209264",
  appId: "1:993017209264:web:9fffd3d8224b4c33b0b675",
  measurementId: "G-JJDMJ1DRXQ",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Initialize analytics only on client side
if (typeof window !== "undefined") {
  getAnalytics(app)
}
