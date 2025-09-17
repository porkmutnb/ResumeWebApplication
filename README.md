# ResumeWebApplication
```make for my resume webapp using angular framework```
### Tools and TechStack
- Node v22.18.0
- Angular v20.2.1
### How to Install
- Before clone project and open project with your IDE and run command below
```
  npm install
```
- create .env file into root path project
```
  FIREBASE_API_KEY=${API_KEY}
  FIREBASE_AUTH_DOMAIN=${AUTH_DOMAIN}
  FIREBASE_DATABASE_URL=${DATABASE_URL}
  FIREBASE_PROJECT_ID=${PROJECT_ID}
  FIREBASE_STORAGE_BUCKET=${STORAGE_BUCKET}
  FIREBASE_MESSAGING_SENDER_ID=${MESSAGING_SENDER_ID}
  FIREBASE_APP_ID=${APP_ID}
```
- run command and wait until build finishing
```
  npm run start:local
```
- go to link below and Enjoy ^.^
```
  http://localhost:4200/
```
### How to Deploy
+ install firebase-tools:
```
  npm install -g firebase-tools
```
+ Login Firebase
```
  firebase login
```
+ Initialize Firebase
```
   firebase init
```
+ Build the project for production
```
  npm run build
```
+ Deploy to Firebase Hosting
```
  firebase deploy --only hosting
```
+ Successfully and go to link below and Enjoy ^.^
```
  https://www.pornthep.net
```