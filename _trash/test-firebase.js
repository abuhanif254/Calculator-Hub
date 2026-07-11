const admin = require('firebase-admin');
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

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY
  })
});

const db = admin.firestore();

async function run() {
  try {
    const ref = db.collection('playground_pens').doc('test-pen');
    await ref.set({ title: 'Test Pen', timestamp: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    console.log('Successfully wrote to playground_pens collection in Firebase Admin!');
    
    // Now let's try reading it back
    const doc = await ref.get();
    console.log('Successfully read back:', doc.data());
  } catch (e) {
    console.error('Failed:', e);
  }
}

run();
