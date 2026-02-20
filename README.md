# ResumeWebApplication

A professional, modular Resume Web Application built using the Angular framework and styled with Tailwind CSS for rapid UI development.

### 🛠 Tools and Tech Stack

- **Node.js**: v22.18.0
- **Angular**: v20.2.1
- **Styling**: Tailwind CSS v4

---

### 🚀 Getting Started (Local Development)

Follow these steps to set up the project locally on your machine.

**1. Install Dependencies**

After cloning the repository and opening the project in your IDE, run the following command to download all necessary Node modules:

```bash
npm install
```

**2. Configure Environment Variables**

This application requires Firebase credentials to function correctly. Create a `.env` file in the root directory of the project and populate it with your Firebase project keys:

```env
FIREBASE_API_KEY=${API_KEY}
FIREBASE_AUTH_DOMAIN=${AUTH_DOMAIN}
FIREBASE_DATABASE_URL=${DATABASE_URL}
FIREBASE_PROJECT_ID=${PROJECT_ID}
FIREBASE_STORAGE_BUCKET=${STORAGE_BUCKET}
FIREBASE_MESSAGING_SENDER_ID=${MESSAGING_SENDER_ID}
FIREBASE_APP_ID=${APP_ID}
```

**3. Run the Development Server**

Start the Angular development server using the local start script. Wait a moment until the build process finishes:

```bash
npm run start:local
```

**4. View the App**

Once compiled, navigate to the following URL in your web browser to see the application in action:

```text
http://localhost:4200/
```

---

### 🌐 How to Deploy (Firebase Hosting)

When you are ready to publish your changes online, follow these steps to deploy the application via Firebase.

**1. Install Firebase CLI Tools**

If you haven't already, install the Firebase Command Line Tools globally on your machine:

```bash
npm install -g firebase-tools
```

**2. Authenticate with Firebase**

Log into your Google account associated with the Firebase project:

```bash
firebase login
```

**3. Initialize Firebase (If not done already)**

Initialize your project directory (choose Hosting during the setup wizard):

```bash
firebase init
```

**4. Build the Production Bundle**

Compile the Angular application into optimized static assets ready for production:

```bash
npm run build
```

**5. Deploy**

Upload the built files to Firebase Hosting:

```bash
firebase deploy --only hosting
```

🎉 **Success!** Your website is now live! You can visit it here:

```text
https://www.pornthep.net
```

### How to Bulk Update Dark/Light Mode Classes

If you need to change color themes across multiple HTML files simultaneously (e.g., updating all `bg-white` classes to have `dark:bg-gray-800`), you can use a Node.js automation script. This saves time and prevents manual errors when dealing with many template files.

**1. Create the Script File**

Create a new file named `update-theme.js` at the root of your project:

```javascript
const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith(".html")) results.push(file);
    }
  });
  return results;
}

// 1. Specify the target directory to scan
const files = walk("./src/app");

// 2. Define the exact words to replace and their new values
const replacements = [
  // Example: Find "bg-white" and replace with "bg-white dark:bg-gray-800"
  // Note: Uses negative lookahead `(?! dark:...)` to prevent duplicate dark classes
  { regex: /bg-white(?! dark:bg-gray-800)([^a-zA-Z0-9-])/g, replacement: "bg-white dark:bg-gray-800$1" },
  { regex: /text-gray-900(?! dark:text-gray-100)([^a-zA-Z0-9-])/g, replacement: "text-gray-900 dark:text-gray-100$1" },
];

// 3. Execute the replacement
let updatedCount = 0;
files.forEach((file) => {
  let originalContent = fs.readFileSync(file, "utf8");
  let newContent = originalContent;

  replacements.forEach(({ regex, replacement }) => {
    newContent = newContent.replace(regex, replacement);
  });

  if (originalContent !== newContent) {
    fs.writeFileSync(file, newContent, "utf8");
    console.log("Updated " + file);
    updatedCount++;
  }
});

console.log(`Successfully updated ${updatedCount} files.`);
```

**2. Customize the Script**

- **Target Location**: Edit `walk('./src/app')` if you only want to affect a specific folder like `./src/app/portfolio`.
- **Colors**: Add your own color mappings to the `replacements` array. The `$1` ensures spacing/grammar remains correct.

**3. Run the Script**

Run the following command in your terminal to execute the bulk update. The script will modify the HTML files automatically.

```bash
node update-theme.js
```
