require('dotenv').config();
const { initializeApp } = require('firebase/app');
const {
  getDatabase,
  ref,
  onValue,
  set,
  child,
  get,
} = require('firebase/database');

// Class for access firebase read/writes
class FirebaseClient {
  constructor() {}

  // create a static instance we can reference
  static instance() {
    if (!FirebaseClient._instance) {
      console.log('[FirebaseClient Service] Instantiating Singleton');
      FirebaseClient._instance = new FirebaseClient();
      FirebaseClient._instance.config = {
        apiKey: process.env.FIREBASE_API_KEY,
        messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        authDomain: 'launchdarklydemo-241db.firebaseapp.com',
        projectId: 'launchdarklydemo-241db',
        storageBucket: 'launchdarklydemo-241db.firebasestorage.app',
      };

      FirebaseClient._instance.firebaseApp = initializeApp(
        FirebaseClient._instance.config
      );
      FirebaseClient._instance.database = getDatabase(
        FirebaseClient._instance.firebaseApp
      );
    }
    return FirebaseClient._instance;
  }

  // write data back to a specific id
  async writeData(id, data) {
    try {
      const db = FirebaseClient._instance.database;
      await set(ref(db, 'accounts/' + id), data);
      console.log(`successfully set data for ${id}`);
      return {
        success: true,
      };
    } catch (e) {
      console.log(`Error setting data for ${id}: ${e}`);
      return {
        success: false,
      };
    }
  }

  // read data from a specific id
  async readData(id) {
    const dbRef = ref(FirebaseClient._instance.database);
    const snapshotResult = await get(child(dbRef, `accounts/${id}`));

    if (snapshotResult.exists()) {
      // console.log(snapshotResult.val());
      return snapshotResult.val();
    } else {
      console.log(`No data available for ${id}`);
      return {};
    }
  }
}

module.exports = FirebaseClient;
