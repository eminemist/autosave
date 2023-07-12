- get .env file
- setup values for - MONGO_URL, JWT_SECRET, JWT_LIFETIME and PORT=5000

npm run setup-production

npm run start

    "setup-production": "npm run install-client && npm run build-client && npm install",
    "install-client": "cd client && npm install",
    "build-client": "cd client && npm run build",
    "server": "nodemon server --ignore client",
    "client": "npm start --prefix client",
    "start": "concurrently --kill-others-on-fail \"npm run server\" \" npm run client\""
