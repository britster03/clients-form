# Full Stack Form with PDF Generator

## Overview

This is the front-end code for the Full Stack Form with PDF Generator. The form collects user information such as name, email, phone number, and an optional free text field. It also includes a checkbox for users to agree to the terms and services.

## Tech Stack 
React.js
Tailwind CSS
Node.js
Express.js
Supabase
PostgreSQL

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Form Structure](#form-structure)
4. [Functions](#functions)
5. [Connectivity with Backend](#connectivity-with-backend)

## Installation

1. Clone the repository:

   ```bash git clone <repository-url>```
2. Change directory to the client folder:
    cd client

3. Install dependencies:
    npm install

## Usage

Run the development server:

    ```npm start```

Visit http://localhost:3000 in your browser.

## Form Structure
The form is built using React and Tailwind CSS. It is designed to be simple and user-friendly.

`Name`: Text input for the user's full name.
`Email Address`: Text input for the user's email address.
`Phone Number`: Text input for the user's phone number.
`Free Text Field (optional)`: A textarea for any additional information the user wants to provide.
`Terms and Service Checkbox`: A checkbox for the user to agree to the terms and services.
`Submit Button`: Clicking this button triggers the form submission.

## Functions

`handleInputChange`: Updates the form state when input fields change.

`handleSubmit`: Handles the form submission. Performs client-side validation, and if successful, sends a POST request to the backend.

`generatePDF`: Generates a PDF document with the form data.

`useEffect`: Invokes the printing function and PDF generation after a successful form submission.

### Connectivity with Backend

The form connects to the backend using a POST request to the `/api/form/submit` endpoint. 
The backend API handles the storage or processing of the form data. Any errors during submission are displayed to the user.


## API Endpoint

The form submits data to the backend API endpoint:

```plaintext POST https://pdf-form.onrender.com/api/form/submit ```


## Backend Integration
The form communicates with the backend to store admission form data. The backend, is available at 
`https://pdf-form.onrender.com/api/form/submit`, it handles the storage of form data and return appropriate responses.

The backend has corresponding endpoints for handling form submissions and potentially storing data in a database. The specific implementation of these endpoints depends on the usage.


## Styling

Tailwind CSS is used for styling the form, providing a clean and responsive user interface. You can customize the styles by modifying the Tailwind CSS classes in the JSX code.

## Additional Notes

This form includes client-side validation to ensure that required fields are filled, and age falls within a valid range.
Upon successful form submission, a PDF document is generated, and the user is alerted about the successful submission.


## Contributing
Feel free to contribute to the project by opening issues or submitting pull requests.
