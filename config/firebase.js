import 'firebase/auth';
import 'firebase/firestore';

import Constants from 'expo-constants';
import firebase from 'firebase/app';

const { firebaseConfig } = Constants.manifest.extra

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()
export default firebase