# OTP Manager

## Overview
OTP Manager is a full-stack web application built with React.js (Vite) and Bulma for the frontend, and Node.js, Express.js, Mongoose, and MongoDB for the backend. It allows users to manage contacts, send OTP messages via Twilio, and track sent messages.

---

## Features
- Fetch contacts from a JSON file.
- Generate a random 6-digit OTP.
- Send OTP via Twilio API.
- Store sent messages in MongoDB.
- Display sent messages on the frontend.
- Responsive UI with Bulma CSS.

---

## Tech Stack
### Frontend:
- React.js (Vite)
- Bulma CSS
- React Router

### Backend:
- Node.js with Express.js
- Mongoose (MongoDB)
- Twilio API (for sending OTPs)

### Database:
- MongoDB (Mongoose ORM)

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/otp-manager.git
cd otp-manager
```

### 2. Install Dependencies
#### Install frontend dependencies:
```bash
cd frontend
npm install
```

#### Install backend dependencies:
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_SERVICE_KEY=your_twilio_service_key
TWILIO_PHONE=your_twilio_phone_number
```

---

## Frontend Structure

### Pages & Components
#### 1. `Navbar.js`
- Contains navigation links for Home, Contacts, and Sent Messages.
- Responsive menu for mobile screens.

#### 2. `HomePage.js`
- Displays an introduction to the app.
- Contains navigation buttons for viewing contacts and sent messages.

#### 3. `ContactList.js`
- Fetches contacts from a JSON file.
- Displays the list of contacts with links to their details.

#### 4. `ContactDetails.js`
- Shows a contact’s details (name and phone number).
- Has a **Send OTP** button that triggers the API call.

#### 5. `SentMessages.js`
- Fetches and displays sent OTP messages from the backend.

### API Calls from Frontend
- **Fetch Contacts:**
  ```javascript
  useEffect(() => {
      fetch("/Contact.json")
          .then(response => response.json())
          .then(data => setContacts(data));
  }, []);
  ```
- **Send OTP:**
  ```javascript
  fetch("http://localhost:5000/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: contact.phone, name: contact.firstName })
  })
  .then(response => response.json())
  .then(data => setMessage(data.message));
  ```
- **Fetch Sent Messages:**
  ```javascript
  useEffect(() => {
      fetch("http://localhost:5000/api/sent-messages")
          .then(response => response.json())
          .then(data => setMessages(data));
  }, []);
  ```

---

## Backend Structure

### Routes & API Endpoints
#### 1. `GET /api/sent-messages`
- Retrieves all sent messages from the database.
- **Response:**
  ```json
  [
      {
          "contactName": "John Doe",
          "otp": "123456",
          "timestamp": "2025-03-16T12:00:00Z"
      }
  ]
  ```

#### 2. `POST /api/send-otp`
- Generates a 6-digit OTP and sends it via Twilio.
- Saves the message in MongoDB.
- **Request Body:**
  ```json
  {
      "phone": "+919876543210",
      "name": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
      "message": "OTP sent successfully!"
  }
  ```

### Twilio Integration (Sending OTP)
#### Code in `backend/routes/otpRoutes.js`
```javascript
const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const Message = require("../models/Message");
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post("/send-otp", async (req, res) => {
    const { phone, name } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await client.messages.create({
            body: `Hello ${name}, your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE,
            to: phone
        });

        const newMessage = new Message({ contactName: name, otp, timestamp: new Date() });
        await newMessage.save();

        res.json({ message: "OTP sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP." });
    }
});

module.exports = router;
```

### Database Schema (`backend/models/Message.js`)
```javascript
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    contactName: String,
    otp: String,
    timestamp: Date
});

module.exports = mongoose.model("Message", MessageSchema);
```

---

## Running the Project
### 1. Start the Backend Server
```bash
cd backend
npm start
```
**Runs on:** `http://localhost:5000`

### 2. Start the Frontend Server
```bash
cd frontend
npm run dev
```
**Runs on:** `http://localhost:5173`

---

## How Twilio Works in This Project
1. The user clicks "Send OTP" in the frontend.
2. The frontend calls the `/api/send-otp` endpoint with the contact’s phone number.
3. The backend generates a 6-digit OTP.
4. Twilio sends an SMS with the OTP to the given phone number.
5. The OTP and recipient details are stored in MongoDB.
6. The frontend fetches sent messages and displays them in the "Sent Messages" page.

---

## Future Enhancements
- Implement authentication (login/register feature).
- Add pagination for sent messages.
- Enable real-time message status updates using WebSockets.
- Improve UI with better animations and themes.

---

## License
This project is licensed under the MIT License.

