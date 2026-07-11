const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, setDoc } = require('firebase/firestore');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...value] = line.split('=');
    if (key) {
      env[key] = value.join('=').replace(/^"|"$/g, '').replace(/\\n/g, '\n');
    }
  }
});

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

console.log('Testing connection to:', firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  try {
    console.log('Fetching test-pen...');
    const penRef = doc(db, 'playground_pens', 'test-pen');
    const existingDoc = await getDoc(penRef);
    console.log('Doc exists?', existingDoc.exists());
    if (existingDoc.exists()) {
      console.log('Data:', existingDoc.data());
    }
    
    console.log('Writing to test-pen...');
    await setDoc(penRef, { testClient: true }, { merge: true });
    console.log('Write successful!');
  } catch (e) {
    console.error('Client SDK Error:', e.code, e.message);
  }
}

run();
