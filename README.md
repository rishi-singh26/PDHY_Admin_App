[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/rishi-singh26/Expo_firebase_boilerplate)

# PDHY Admin app

## Installation

```sh
$ git clone https://github.com/rishi-singh26/Code_Scanner.git
Clones this repo
$ npm install
Install all the node modules
$ expo upgrade
```

### Firebase credentials setup

- Create a new folder named "Constants" inside "src".
- Inside "Constants" foldar create a file by name "Api.js"
- Inside "Api.js" copy the code below

```sh
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PRIJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const cloudStorage = firebase.storage();
```

### Google Maps Setup

- Rename the "dummy_app.json" file present in the root directory to "app.json".
- Inside "app.json" file replace "YOUR_GOOGLE_MAPS_API_KEY" with your google maps api key.

```sh
"config": {
  "googleMaps": {
    "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
  }
},
```
