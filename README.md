# BIKE_SERVICE_APP
CartRabbit Task - Bike Service Booking

## 🚀 Features

- Customer Registration & Login
- Owner Login with role-based dashboard
- Bike booking management
- Owner-suggested additional services
- Booking completion emails with details
- MongoDB for data persistence

## Backend Setup with Dependencies

- cd backend
- npm install express mongoose cors dotenv bcryptjs jsonwebtoken nodemailer body-parser validator
- npm install --save-dev nodemon

# Create a .env file

- MONGO_URI=mongodb://localhost:27017/bikeservice
- JWT_SECRET=your_jwt_secret
- PORT=5000
- EMAIL_USER=gokulp2608@gmail.com
- EMAIL_PASS=fnqowfwmoczrnzzx 

📌 Disclaimer & Email Setup Instructions

This email and password used in the project are generated via Google App Passwords, not your official Gmail password.

- To set up email functionality for sending notifications in the project, follow these steps:

1. Go to your Google Account.

2. Click on “Manage your Google Account.”

3. Navigate to the “Security” tab.

4. Scroll down and find “App Passwords.”

5. Create a new app password for the Bike Service App.

6. Copy the generated password and paste it into the .env file as the value for EMAIL_PASS.

# Final Step(To start backend)

- npm run dev 


## Frontend Setup

- cd frontend 
- npm install
- npm start
