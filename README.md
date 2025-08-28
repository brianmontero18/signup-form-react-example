# Signup Form – React 19

A simple signup form built with **React 19** using Form Actions (`useActionState` and `useFormStatus`).  
No third-party libraries are used other than React itself.

## Requirements
- Node.js v18 or higher
- npm

## Installation
```bash
npm install
```

## Running the Project
Start the development server:
```bash
npm start
```
The app will be available at `http://localhost:5173`.

## Features
- **Form fields**: Username, Password, Confirm Password
- **Validation**:
  - All fields are required
  - Password and Confirm Password must match
- **Submission**:
  - Simulates a mock async request
  - Shows an alert with the submitted username
- **UX**:
  - Submit button disabled while request is pending
  - Form resets automatically after a successful submission

## Notes
- Inputs are uncontrolled; validation is handled inside the form action
- `useActionState` manages the submission and validation state
- `useFormStatus` provides the pending state for the submit button
