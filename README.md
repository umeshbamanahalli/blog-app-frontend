#  Full-Stack Blog Application - Frontend

This is the frontend client for the Full-Stack Blog Application, built with **React**, **Vite**, and **Reactstrap**. It communicates with a Spring Boot REST API backend to provide user authentication, profile management, and dynamic blogging capabilities.

---

##  Tech Stack

* **Framework:** React (Vite)
* **UI Library / Styling:** Reactstrap (Bootstrap 5), React Icons
* **HTTP Client:** Axios (with custom interceptors for JWT authentication)
* **Notifications:** React Toastify
* **Routing:** React Router DOM

---

##  Key Features

* **User Authentication:** Secure login and registration flows with token management via `localStorage`.
* **Dynamic Profile Management:** View user details, assigned roles, and editable bios with real-time API synchronization and local state caching.
* **Protected Routes:** Route guards ensuring secure access to authorized pages.
* **Responsive Layout:** Modern, mobile-friendly UI built with Bootstrap and custom CSS gradients.

---

##  Project Structure

```text
src/
├── assets/          # Images, logos, and global styles
├── auth/            # Authentication helper functions (token handling, local storage)
├── components/      # Reusable UI components (Base layout, Navbar, etc.)
├── pages/           # Page views (Profile, Login, Register, Home, etc.)
├── services/        # API configuration and helper files (Axios instances)
├── App.jsx          # Main routing and application entry
└── main.jsx         # React root renderer
