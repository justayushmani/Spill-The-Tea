# Spill-The-Tea ☕ 

An interactive platform designed for students to share their academic experiences, frustrations, and "tea" in a safe, moderated environment.

## 🔗 Live Demo
Check out the live application here: **[https://spill-the-tea-1.onrender.com/](https://spill-the-tea-1.onrender.com/)**

## ✨ Key Features

- **🛡️ Secure Authentication**
  - Robust Login and Registration system.
  - Role-Based Access Control (RBAC) specifically designed for Moderators and Admins.

- **💬 The Trauma Wall**
  - A dynamic, interactive wall where users can view posted "traumas" and confessions.
  - Enhanced with smooth animations using **GSAP** for an engaging user experience.

- **📝 Post Submission**
  - Users can submit their own stories via a dedicated submission page.
  - Secure submission process ensuring content quality.

- **👮 Moderator Panel**
  - Exclusive dashboard for moderators and admins to review, approve, or reject submissions.
  - Ensures the community remains safe and relevant.

- **📱 Responsive Design**
  - Fully responsive interface that works seamlessly across desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React.js**: For building the user interface.
- **React Router**: For seamless client-side navigation.
- **GSAP**: For high-performance animations.
- **Axios**: For handling API requests.
- **TailwindCSS / CSS**: For styling (Assumed based on project structure).

### Backend
- **Node.js & Express.js**: For the server and API handling.
- **MongoDB & Mongoose**: For database management and schema modeling.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcrypt**: For password hashing.

## 🚀 Getting Started locally

To run this project locally, follow these steps:

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB installed locally or a MongoDB Atlas URI.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/justayushmani/Spill-The-Tea.git
    cd Spill-The-Tea
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Create a .env file in the backend directory and add your variables:
    # PORT=5000
    # MONGODB_URI=your_mongodb_uri
    # JWT_SECRET=your_jwt_secret
    npm run dev
    ```

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:3000` to view the app.

## 📄 License
This project is licensed under the ISC License.

---
**Developed by Ayush Mani Tiwari**
