# AWS Todo App
- A full-stack Todo application built with React, hosted on AWS Amplify, and powered by a serverless backend.

# Features
- Create, update, delete, and manage tasks.
- Responsive and user-friendly design.
- Serverless backend for fast and reliable performance.
- Hosted on AWS Amplify for seamless deployment and scaling.
- Technologies Used
- Frontend: React, React Router
- Backend: AWS Lambda, API Gateway
- Database: DynamoDB
- Hosting: AWS Amplify
- Getting Started
- Follow these instructions to set up the project locally:

# Prerequisites
Node.js
AWS CLI
A GitHub account
# Installation
- Clone the repository:
```
git clone https://github.com/your-username/aws-todo-app.git
```
- Navigate to the frontend directory:
```
cd aws-todo-app/frontend/todo-list
```
# Install dependencies:
```
npm install
```
# Start the development server:
```
npm start
```
The app should now be running at http://localhost:3000.

# Deployment
Push your code changes to the main branch on GitHub.
AWS Amplify will automatically detect the changes and redeploy the app.
Visit your app at the Amplify-provided URL.
Environment Variables
***Make sure you configure the following environment variables in AWS Amplify:***

- ***REACT_APP_API_URL***: The URL of your backend API Gateway.
# Folder Structure
```
aws-todo-app/
├── frontend/
│   └── todo-list/
│       ├── src/
│       │   ├── components/    # Reusable React components
│       │   ├── App.js         # Main App entry point
│       │   └── index.js       # React DOM rendering
│       ├── public/            # Static assets
│       └── package.json       # Dependencies
├── backend/                   # (Optional if your backend is not part of this repo)
└── README.md                  # Project documentation
```
# Contributing
Contributions are welcome! Feel free to submit issues or pull requests.
# Hosted Web App
## https://master.dai9eg2bawqry.amplifyapp.com/
