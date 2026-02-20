const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file
const result = dotenv.config();

if (result.error) {
  console.log('Error loading .env file, falling back to process.env');
}

const envConfigFile = `export const environment = {
  production: true,
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

const targetPath = './src/environments/environment.prod.ts';

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.prod.ts file generated correctly at ${targetPath} \n`);
  }
});
