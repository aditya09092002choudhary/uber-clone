# Uber Clone Backend Endpoint

## POST /users/register

### Description
This endpoint allows a new user to register by providing their first name, last name, email, and password.

### Request Body
- `firstname` (string): The first name of the user. Must be at least 3 characters long.
- `lastname` (string): The last name of the user.
- `email` (string): The email address of the user. Must be a valid email format.
- `password` (string): The password for the user account. Must be at least 6 characters long.

### Responses

#### Success
- **Status Code**: `201 Created`
- **Body**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      // ...other user fields...
    }
  }
  ```

#### Validation Error
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "firstname",
        "location": "body"
      },
      {
        "msg": "Password must be of length 6",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Server Error
- **Status Code**: `500 Internal Server Error`
- **Body**:
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

## POST /users/login

### Description
This endpoint allows an existing user to log in by providing their email and password.

### Request Body
- `email` (string): The email address of the user. Must be a valid email format.
- `password` (string): The password for the user account. Must be at least 6 characters long.

### Responses

#### Success
- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      // ...other user fields...
    }
  }
  ```

#### Validation Error
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be of length 6",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Authentication Error
- **Status Code**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Server Error
- **Status Code**: `500 Internal Server Error`
- **Body**:
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

## GET /users/profile

### Description
This endpoint retrieves the profile information of the logged-in user.

### Responses

#### Success
- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      // ...other user fields...
    }
  }
  ```

#### Authentication Error
- **Status Code**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

#### Server Error
- **Status Code**: `500 Internal Server Error`
- **Body**:
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

## GET /users/logout

### Description
This endpoint logs out the current user by clearing the authentication token.

### Responses

#### Success
- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Server Error
- **Status Code**: `500 Internal Server Error`
- **Body**:
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
