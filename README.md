# Hotel Reservation System

This repository contains the full-stack implementation of a **Hotel Reservation System**. The system allows users to manage hotel bookings, including making, updating, and canceling reservations. It is built with modern web technologies to ensure a seamless and responsive user experience. Below is a detailed description of the project, its structure, and how to set it up.

## Features

- **User-Friendly Interface**: A responsive frontend built with **React** and styled using **Tailwind CSS**, providing a clean and interactive design.
- **Reservation Management**: Allows users to create, update, and delete reservations with a simple interface.
- **Backend API**: Developed with **Node.js** and **Express**, the backend handles the business logic and data management for the reservation system.
- **Database**: **SQLite** is used as the database, with **Sequelize** as the ORM to interact with the database.
- **API Testing**: All backend API endpoints have been tested using **POSTMAN** to ensure reliable and consistent functionality.

## Technologies Used

- **Frontend**: 
  - **React**: JavaScript library for building user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework for fast and responsive styling.
  
- **Backend**:
  - **Node.js**: JavaScript runtime for server-side development.
  - **Express**: Web framework for building RESTful APIs.
  - **Sequelize**: ORM for interacting with the SQLite database.
  - **SQLite**: Lightweight database used for storing reservation data.

- **Testing**:
  - **POSTMAN**: Tool used for testing the API endpoints and ensuring proper functionality.

## Project Structure

The project is divided into two main sections:

### Frontend (React)

- **Components**: Contains all React components, including forms for making and updating reservations, as well as components for displaying reservation details.
- **Styles**: Tailwind CSS classes are used throughout the frontend to ensure a clean and responsive design.
- **API Calls**: Uses `fetch` or `axios` to make requests to the backend API and update the frontend UI dynamically.

### Backend (Node.js, Express, Sequelize)

- **API Routes**: RESTful routes for managing reservations, including:
  - `POST /reservations`: Create a new reservation.
  - `GET /reservations`: Retrieve all reservations.
  - `GET /reservations/:id`: Retrieve a specific reservation by ID.
  - `PUT /reservations/:id`: Update an existing reservation.
  - `DELETE /reservations/:id`: Delete a reservation.
- **Models**: Sequelize models define the structure of the database and the relationships between tables.
- **Database**: SQLite is used to store reservation data in a local database file.

## Installation

To set up and run the project locally, follow these steps:

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **SQLite** installed for the database (Sequelize will handle database setup automatically).

