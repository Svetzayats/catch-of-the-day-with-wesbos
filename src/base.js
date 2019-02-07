import Rebase from 're-base'; 
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA4b7PJxbf1ABQoEVJJPqE77vrta022JTs",
    authDomain: "catch-of-the-day-svetzayats.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-svetzayats.firebaseio.com"
  }); 
const base = Rebase.createClass(firebaseApp.database()); 

export {firebaseApp}; 
export default base; 