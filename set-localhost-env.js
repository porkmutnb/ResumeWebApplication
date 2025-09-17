const { writeFileSync } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const envConfigFile = `
export const environment = {
  production: false,
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}'
  }
};
`;
writeFileSync(targetPath, envConfigFile);
console.log(`✅ Environment file generated at ${targetPath}`);