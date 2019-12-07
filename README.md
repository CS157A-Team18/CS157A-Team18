## Starting Up Express Server

This directory is where the Express backend lays. In this directory, do:

### `npm install`

This will install the required dependencies for this project.

### `npm start`

This will start the `express` server on port 3001.

The following environment variables need to be set in the backend (`root` directory):

- RDS_ENDPOINT
- RDS_USERNAME
- RDS_PASSWORD
- RDS_DATABASE
- REACT_ENDPOINT

## Starting Up React Frontend

Assuming you are in the root directory where the Express backend is, do `cd client` to navigate to the `client` folder where the React front end lays. Once you are in the `client` folder, do:

### `npm install`

This will install the required dependencies for this project.

### `npm start`

This will start the React server on port 3000.

The following environment variables need to be set in the frontend (`client` directory):

- REACT_APP_FIREBASE_API_KEY
- REACT_APP_FIREBASE_AUTH_DOMAIN
- REACT_APP_FIREBASE_DATABASE_URL
- REACT_APP_FIREBASE_PROJECT_ID
- REACT_APP_FIREBASE_STORAGE_BUCKET
- REACT_APP_FIREBASE_MESSAGING_SENDER_ID
- REACT_APP_FIREBASE_APP_ID
- REACT_APP_MEASUREMENT_ID
- REACT_APP_EXPRESS_BACKEND