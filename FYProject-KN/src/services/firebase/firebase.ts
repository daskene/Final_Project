import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as analyticsIsSupported, type Analytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAEoXfSxUlpwVBBxGkQghQ71XEpR9ZVdiI',
  authDomain: 'ai-story-app-4334f.firebaseapp.com',
  projectId: 'ai-story-app-4334f',
  storageBucket: 'ai-story-app-4334f.firebasestorage.app',
  messagingSenderId: '29383073311',
  appId: '1:29383073311:web:077a8ac74b0251b75abf2a',
  measurementId: 'G-MPXDF7FWHJ',
};

// Initialize Firebase core services
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics: Analytics | null = null;
analyticsIsSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { analytics };
