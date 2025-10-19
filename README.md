# Quick-Chat

A real-time chat application built with **Node.js**, **Express**, **MongoDB**, and **Socket.io**, featuring cloud media uploads via **Cloudinary**. Designed for fast, responsive communication with multiple users.

## Features

- Real-time messaging with Socket.io
- User authentication and secure login
- Cloud image uploads (Cloudinary)
- Retrieve all contacts except the logged-in user
- Scalable backend using Node.js and Express
- MongoDB for data persistence

## API Endpoints
POST /signup – Create new user
POST /login – Authenticate user
POST /logout - Logout user
PUT /update-profile - update profile

GET /contact - get all contact users
POST /messages – Send a new message
GET /messages/:conversationId – Get messages in a conversation
POST /send/:id - send a message to a user

## Technologies
Backend: Node.js, Express

Database: MongoDB, Mongoose

Realtime Communication: Socket.io

Media Storage: Cloudinary

Authentication: JWT

Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/quick-chat.git
cd quick-chat
Install dependencies:

bash
Copy code
npm install
Set up environment variables (.env):

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
Start the server:

bash
Copy code
npm start
The app will run on http://localhost:5000.


