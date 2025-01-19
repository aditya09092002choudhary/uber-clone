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
