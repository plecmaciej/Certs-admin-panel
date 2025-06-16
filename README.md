# Certs admin panel

This project was created as part of a technical assignment for a job interview. The task was to configure and modify an existing full-stack application (Ruby on Rails + React + Redux) according to specific requirements.

![image](https://github.com/user-attachments/assets/2ffdc55d-e2fe-46dc-a14d-93b11c9a869e)

## Assignment Scope

The task aimed to evaluate the following skills:

- Setting up and configuring the development environment independently
- Creating a basic Rails API endpoint (based on an existing pattern)
- Creating a React CRUD view (based on existing components)
- Debugging and fixing frontend issues
- Familiarity with React, Redux, and Rails

### Required Functionalities

- Display a list view of certificates (representing courses completed by a user)
- Implement full CRUD operations for certificates:
  - Fields: `name` (text), `description` (textarea), and `user` (select dropdown)
- Fix a bug: After login, the user should be redirected to the users page (currently remains on login page but top menu is shown)
- Add a new menu item `Terms` that opens a modal with Terms & Conditions content (using Redux)

---

## Project Setup

### Backend (Ruby on Rails)

1. **Install Ruby 2.6.10**

   **Windows:**
   - Download from: https://rubyinstaller.org/downloads/
   - Choose: `Ruby+Devkit 2.6.10`
   - Run the installer with default settings
   - At the end of installation, a terminal window will appear to configure MSYS2 — press `Enter` when prompted

2. **Install dependencies:**

   ```bash
   bundle install  

3. **Set up the database:**

   ```bash
   rake db:setup
   rake db:seed

4. **Start the Rails server:**

   ```bash
   rails server  

### Frontend (React + Redux)

1. **Install Node.js v14.x**

   You can use Node Version Manager (nvm) or install manually from the Node.js site.

2. **Install dependencies:**

   ```bash
   npm install

3. **Start the frontend development server:**

   ```bash
   npm run start


## Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)

### Backend
- [Ruby on Rails](https://rubyonrails.org/)

### Database
- [PostgreSQL](https://www.postgresql.org/)
- (or other configured database)

### Dev Tools
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [ESLint](https://eslint.org/)

