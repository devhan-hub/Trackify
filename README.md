
# Trackify
![logo](public/Images/logo.png)


## Live
[(https://trackify-jet.vercel.app/)](url)

## Available Scripts

## Screenshots
![image](public/Images/image1.jpg)


![image](public/Images/image2.jpg)


![image](public/Images/image3.jpg)


![image](public/Images/image4.jpg)


![image](public/Images/image6.jpg)


![image](public/Images/image7.jpg)


![image](public/Images/image8.jpg)


![image](public/Images/image9.jpg)


![image](public/Images/image10.jpg)



## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Database Schema](#database-Schema)
7. [Authors](#authors)
8. [License](#license)

## Introduction

Welcome to **Trackify**—your ultimate productivity companion!

Stay on top of your tasks with ease. This intuitive web app allows you to:

- Create and manage tasks with deadlines and priorities
- Easily update and edit tasks to keep everything organized
- Mark tasks as completed or pending to track your progress
- Organize tasks into categories or projects for a streamlined workflow
- Visualize your tasks and progress with a powerful dashboard

Whether you're managing personal goals or work projects, **Trackify** helps you stay productive and organized—effortlessly.


## Features

- **User Authentication**:
  - Sign-up, sign-in, and log out to secure your task data.

- **Task Management**:
  - Create tasks with deadlines, priorities, and descriptions.
  - Easily update and edit tasks as your priorities shift.
  - Mark tasks as completed or pending to keep track of progress.

- **Task Organization**:
  - Categorize tasks into different projects or categories for better organization.

- **Dashboard**:
  - Visualize all your tasks and progress in a comprehensive, user-friendly dashboard.

- **Task Prioritization**:
  - Assign priorities to tasks, ensuring that the most important tasks stand out.

- **Search Functionality**:
  - Quickly search for specific tasks by title, description, or category to find what you need in no time.


  ## Technology Stack

- **Database**: Firestore (NoSQL Database)
- **Frontend**: React +Tailwind CSS + MUI
- **Authentication**: Firebase Authentication
- **Hosting**: Vercel (for frontend deployment)
- **State Managment**: REDUX

## Project Structure
   ```plaintext
 LICENSE
.
├── README.md
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── Images
│   │   ├── doit.jpg
│   │   ├── home.png
│   │   ├── images.jpg
│   │   ├── logo.png
│   │   ├── logo2.png
│   │   ├── logo3.png
│   │   ├── plan.png
│   │   ├── profile.jpg
│   │   └── undraw_welcome_re_h3d9.svg
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.js
│   ├── Redux
│   │   ├── TasksAddSlice.jsx
│   │   ├── TodoStore.jsx
│   │   └── User.jsx
│   ├── Utiles
│   │   ├── ProtectedRoute.jsx
│   │   └── firebaseConfig.jsx
│   ├── components
│   │   ├── Dashbored.jsx
│   │   ├── DeleteDialog.js
│   │   ├── EachCatagory.js
│   │   ├── Login
│   │   │   ├── AuthButton.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── MobileView.js
│   │   │   └── SignLogin.jsx
│   │   ├── NotFound.jsx
│   │   ├── Planned.js
│   │   ├── StatusBar.js
│   │   ├── allCatagory
│   │   │   ├── AddNewCatagory.js
│   │   │   └── Update.jsx
│   │   ├── display
│   │   │   ├── Display.jsx
│   │   │   ├── TodoDisplay.js
│   │   │   └── Utiles.jsx
│   │   ├── inputTask
│   │   │   ├── InputToDo.jsx
│   │   │   └── UploadImage.js
│   │   └── sideDrawer
│   │       ├── CustomDate.jsx
│   │       ├── Navigation.jsx
│   │       ├── SearchMain.jsx
│   │       ├── SideDrawer.jsx
│   │       └── SideDrawerComp.jsx
│   ├── hooks
│   │   ├── useGroupManager.jsx
│   │   └── useTaskManager.jsx
│   ├── index.css
│   └── index.js
└── tailwind.config.js
```  
## Setup and installation
1.  **clone the repository**

 git clone https://github.com/devhan-hub/TaskTracker.git
 
3. **Navigate into the Directory**]
 ```bash
   cd TaskTracker
```

 3. **Install dependencies**
   ```bash
      npm install
    or
      yarn install
```
    
 5. **Run the Appication**
```bash
   npm run
    or
    yarn run
```
    
## Database Schema

### User Collection
- **Collection Name**: `users`
  - **Document ID**: `userId`
    - `_id`: String (User ID)
    - `name`: String (User's name)
    - `email`: String (User's email)
    - `password`: String (Hashed password)
    - `created_at`: Timestamp (Account creation date)

### Groups Collection
- **Collection Name**: `users/{userId}/groups`
  - **Document ID**: `groupId`
    - `name`: String (Group name)


### Tasks Collection
- **Collection Name**: `users/{userId}/groups/{groupId}/todos`
  - **Document ID**: `taskId`
    - `title`: String (Title of the task)
    - `description`: String (Description of the task)
    - `dueDate`: Timestamp (Due date for the task)
   - `catagory`: String(category todo belong)
    - `priority`: String (Priority of the task, e.g., 'low', 'medium', 'high')
   
 
   

### Todo Collection
- **Collection Name**: `users/{userId}/todos`
  - **Document ID**: `todoId`
    - `taskIds`: Array of Strings (IDs of tasks in the todo)
    - `name`: String (Name of the to-do list)
    - `createdAt`: Timestamp (Todo creation date)

### AllTasks Collection
- **Collection Name**: `users/{userId}/alltasks`
  - **Document ID**: `taskId`
     - `title`: String (Title of the task)
    - `description`: String (Description of the task)
    - `dueDate`: Timestamp (Due date for the task)
   - `catagory`: String(category todo belong)
    - `priority`: String (Priority of the task, e.g., 'low', 'medium', 'high')


   ## Author

**Hanan Abdushikur**  
- [GitHub](https://github.com/devhan-hub)  
- [LinkedIn](https://linkedin.com/in/hanan-abdulshikur)

---

## License

This project is licensed under the **MIT License**.  
Copyright &copy; 2024 Hanan Abdushikur.

