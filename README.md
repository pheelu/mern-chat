# MERN Chat - A Real-Time Messaging App

A real-time messaging application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, log in, and send real-time messages to other users. The app uses WebSocket for real-time communication and JWT for secure user authentication.

## Features

*   **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
*   **Real-Time Messaging:** Instant messaging using WebSocket for real-time communication.
*   **Online Users:** Track and display online users in real-time.
*   **Message History:** Fetch and display message history between users.
*   **Cookie-Based Authentication:** Secure cookie-based authentication for persistent user sessions.

## Technologies Used

**Frontend:**

*   React.js
*   Axios (for API calls)
*   WebSocket Client (for real-time communication)
*   Tailwind CSS / Material-UI (for styling)

**Backend:**

*   Node.js
*   Express.js
*   MongoDB (with Mongoose for database management)
*   WebSocket (for real-time communication)
*   JWT (for authentication)
*   Bcrypt (for password hashing)
*   Cookie-Parser (for handling cookies)

## Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/mern-chat.git](https://github.com/your-username/mern-chat.git)
    cd mern-chat
    ```

2.  **Install dependencies:**
        ```
        npm install
        ```


3.  **Set up environment variables:**

    Create a `.env` file in the `api` directory and add the following:

    ```env
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLIENT_URL=http://localhost:3000
    PORT=4040
    ```

4.  **Run the application:**

    *   Start the backend server:

        ```bash
        cd api
        nodemon index.js
        ```

    *   Start the frontend development server:

        ```bash
        cd client
        npm run dev
        ```

5.  **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

**Authentication**

*   `POST /register`: Register a new user.

    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```

*   `POST /login`: Log in an existing user.

    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```

*   `POST /logout`: Log out the current user.

**Messages**

*   `GET /messages/:userId`: Fetch messages between the current user and another user (`userId`).

**Users**

*   `GET /people`: Fetch a list of all users (for messaging).
*   `GET /profile`: Fetch the current user's profile data.

## WebSocket Communication

The app uses WebSocket for real-time communication. Here's how it works:

1.  When a user logs in, their WebSocket connection is established.
2.  The server tracks online users and notifies all clients in real-time.
3.  Messages are sent and received in real-time via WebSocket.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeatureName`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeatureName`).
5.  Open a pull request.

## Acknowledgments

*   WebSocket for enabling real-time communication.
*   MongoDB for providing a flexible NoSQL database.
*   React.js for building a dynamic and responsive frontend.
