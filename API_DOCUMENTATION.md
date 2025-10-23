# AZStock API Documentation

This document provides information about the AZStock API endpoints and how to use them.

## Base URL

All API endpoints are prefixed with `/api`.

## Authentication

The API uses token-based authentication. To access protected endpoints, you need to include the token in the Authorization header:

```
Authorization: Bearer {your_token}
```

### Authentication Endpoints

#### Register

-   **URL**: `/api/register`
-   **Method**: `POST`
-   **Description**: Register a new user
-   **Request Body**:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "password_confirmation": "password123",
        "role": "buyer"
    }
    ```
    The `role` field must be one of: `buyer`, `vendor`, or `admin`. When registering as a vendor, a vendor profile will be automatically created.
-   **Response**: Returns the user data and a token

#### Login

-   **URL**: `/api/login`
-   **Method**: `POST`
-   **Description**: Login with existing credentials
-   **Request Body**:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```
-   **Response**: Returns the user data and a token

#### Logout

-   **URL**: `/api/logout`
-   **Method**: `POST`
-   **Description**: Invalidate the current token
-   **Authentication**: Required
-   **Response**: Confirmation message

## Categories

### Get All Categories

-   **URL**: `/api/categories`
-   **Method**: `GET`
-   **Description**: Get a list of all categories
-   **Authentication**: Not required

### Get a Specific Category

-   **URL**: `/api/categories/{category_id}`
-   **Method**: `GET`
-   **Description**: Get details of a specific category
-   **Authentication**: Not required

### Create a Category

-   **URL**: `/api/categories`
-   **Method**: `POST`
-   **Description**: Create a new category
-   **Authentication**: Required
-   **Request Body**:
    ```json
    {
        "name": "Electronics"
    }
    ```

### Update a Category

-   **URL**: `/api/categories/{category_id}`
-   **Method**: `PUT`
-   **Description**: Update an existing category
-   **Authentication**: Required
-   **Request Body**:
    ```json
    {
        "name": "Updated Electronics"
    }
    ```

### Delete a Category

-   **URL**: `/api/categories/{category_id}`
-   **Method**: `DELETE`
-   **Description**: Delete a category
-   **Authentication**: Required

## Products

### Get All Products

-   **URL**: `/api/products`
-   **Method**: `GET`
-   **Description**: Get a list of all products
-   **Authentication**: Not required
-   **Query Parameters**:
    -   `category_id`: Filter by category
    -   `vendor_id`: Filter by vendor

### Get a Specific Product

-   **URL**: `/api/products/{product_id}`
-   **Method**: `GET`
-   **Description**: Get details of a specific product
-   **Authentication**: Not required

### Create a Product

-   **URL**: `/api/products`
-   **Method**: `POST`
-   **Description**: Create a new product
-   **Authentication**: Required
-   **Request Body**: Form data with fields:
    -   `name`: Product name
    -   `description`: Product description
    -   `category_id`: Category ID
    -   `images[]`: Product images (multiple files allowed)

### Update a Product

-   **URL**: `/api/products/{product_id}`
-   **Method**: `PUT`
-   **Description**: Update an existing product
-   **Authentication**: Required
-   **Request Body**: Form data with fields:
    -   `name`: Product name
    -   `description`: Product description
    -   `category_id`: Category ID
    -   `images[]`: Product images (multiple files allowed)

### Delete a Product

-   **URL**: `/api/products/{product_id}`
-   **Method**: `DELETE`
-   **Description**: Delete a product
-   **Authentication**: Required

## Auctions

### Get All Auctions

-   **URL**: `/api/auctions`
-   **Method**: `GET`
-   **Description**: Get a list of all auctions
-   **Authentication**: Not required
-   **Query Parameters**:
    -   `status`: Filter by status (active, ended)
    -   `vendor_id`: Filter by vendor

### Get a Specific Auction

-   **URL**: `/api/auctions/{auction_id}`
-   **Method**: `GET`
-   **Description**: Get details of a specific auction
-   **Authentication**: Not required

### Get My Auctions

-   **URL**: `/api/my-auctions`
-   **Method**: `GET`
-   **Description**: Get auctions created by the authenticated vendor
-   **Authentication**: Required

### Create an Auction

-   **URL**: `/api/auctions`
-   **Method**: `POST`
-   **Description**: Create a new auction
-   **Authentication**: Required
-   **Request Body**:
    ```json
    {
        "product_id": 1,
        "start_time": "2023-01-01T12:00:00",
        "end_time": "2023-01-10T12:00:00",
        "starting_price": 100.0,
        "reserve_price": 150.0
    }
    ```

### Update an Auction

-   **URL**: `/api/auctions/{auction_id}`
-   **Method**: `PUT`
-   **Description**: Update an existing auction
-   **Authentication**: Required
-   **Request Body**:
    ```json
    {
        "end_time": "2023-01-15T12:00:00",
        "reserve_price": 200.0,
        "status": "active"
    }
    ```

### Delete an Auction

-   **URL**: `/api/auctions/{auction_id}`
-   **Method**: `DELETE`
-   **Description**: Delete an auction (only if no bids have been placed)
-   **Authentication**: Required

### End an Auction

-   **URL**: `/api/auctions/{auction_id}/end`
-   **Method**: `POST`
-   **Description**: Manually end an active auction
-   **Authentication**: Required
-   **Authorization**: Only the vendor who created the auction or an admin can end it
-   **Response**: Returns the auction details with the winning bid information

### Process Refunds for an Auction

-   **URL**: `/api/auctions/{auction_id}/refunds`
-   **Method**: `POST`
-   **Description**: Manually process refunds for unsuccessful bids on an ended auction
-   **Authentication**: Required
-   **Authorization**: Only the vendor who created the auction or an admin can process refunds
-   **Response**: Returns details about the processed refunds
    ```json
    {
        "message": "Refunds processed successfully for auction #1",
        "processed_bids": 3,
        "failed_bids": 0,
        "refunded_amount": 250.0
    }
    ```

## Bids

### Place a Bid

-   **URL**: `/api/auctions/{auction_id}/bids`
-   **Method**: `POST`
-   **Description**: Place a bid on an auction
-   **Authentication**: Required
-   **Request Body**:
    ```json
    {
        "bid_amount": 120.0
    }
    ```

### Get My Bids

-   **URL**: `/api/my-bids`
-   **Method**: `GET`
-   **Description**: Get bids placed by the authenticated user
-   **Authentication**: Required
-   **Query Parameters**:
    -   `status`: Filter by bid status (active, won, lost, cancelled)
    -   `per_page`: Number of bids per page (default: 15)

### Cancel a Bid

-   **URL**: `/api/bids/{bid_id}/cancel`
-   **Method**: `POST`
-   **Description**: Cancel an active bid and release the hold on funds
-   **Authentication**: Required
-   **Response**: Returns the updated bid details and wallet balance

## User

### Get User Profile

-   **URL**: `/api/user`
-   **Method**: `GET`
-   **Description**: Get the authenticated user's profile
-   **Authentication**: Required

### Get All Users (Admin Only)

-   **URL**: `/api/admin/users`
-   **Method**: `GET`
-   **Description**: Get a list of all users (admin access required)
-   **Authentication**: Required
-   **Authorization**: Admin role required
-   **Query Parameters**:
    -   `role`: Filter by role (buyer, vendor, admin)
    -   `per_page`: Number of users per page (default: 15)
-   **Response**: Returns a paginated list of users

### Get User by ID (Admin Only)

-   **URL**: `/api/admin/users/{user_id}`
-   **Method**: `GET`
-   **Description**: Get details of a specific user (admin access required)
-   **Authentication**: Required
-   **Authorization**: Admin role required
-   **Response**: Returns the user details including role and related information

### Update User (Admin Only)

-   **URL**: `/api/admin/users/{user_id}`
-   **Method**: `PUT`
-   **Description**: Update a user's information (admin access required)
-   **Authentication**: Required
-   **Authorization**: Admin role required
-   **Request Body**:
    ```json
    {
        "name": "Updated Name",
        "email": "updated@example.com",
        "role": "vendor",
        "password": "newpassword123"
    }
    ```
-   **Response**: Returns the updated user details

### Delete User (Admin Only)

-   **URL**: `/api/admin/users/{user_id}`
-   **Method**: `DELETE`
-   **Description**: Delete a user (admin access required)
-   **Authentication**: Required
-   **Authorization**: Admin role required
-   **Response**: Confirmation message

## Activity Logs (Admin Only)

### Get Activity Logs

-   **URL**: `/api/admin/activity-logs`
-   **Method**: `GET`
-   **Description**: Get a list of activity logs (admin access required)
-   **Authentication**: Required
-   **Authorization**: Admin role required
-   **Query Parameters**:
    -   `user_id`: Filter by user ID
    -   `action_type`: Filter by action type (auth, crud, system)
    -   `entity_type`: Filter by entity type (user, product, auction, bid)
    -   `entity_id`: Filter by entity ID (requires entity_type to be specified)
    -   `start_date`: Filter by start date (YYYY-MM-DD)
    -   `end_date`: Filter by end date (YYYY-MM-DD)
    -   `per_page`: Number of logs per page (default: 15)
-   **Response**: Returns a paginated list of activity logs

### Get Activity Log Statistics

-   **URL**: `/api/admin/activity-logs/statistics`
-   **Method**: `GET`
-   **Description**: Get activity log statistics (admin access required)
-   **Authentication**: Required
-   **Authorization**: Admin role required
-   **Query Parameters**:
    -   `start_date`: Filter by start date (YYYY-MM-DD)
    -   `end_date`: Filter by end date (YYYY-MM-DD)
-   **Response**: Returns statistics about activity logs including:
    -   Total logs count
    -   Logs by action type
    -   Logs by entity type
    -   Top users by activity
    -   Daily activity counts

## Wallet

### Get Wallet

-   **URL**: `/api/wallet`
-   **Method**: `GET`
-   **Description**: Get the authenticated user's wallet information
-   **Authentication**: Required
-   **Response**: Returns wallet details including balance, held balance, and available balance

### Deposit Funds

-   **URL**: `/api/wallet/deposit`
-   **Method**: `POST`
-   **Description**: Deposit funds into the authenticated user's wallet
-   **Authentication**: Required
-   **Request Body**:
    ```json
    {
        "amount": 100.0,
        "payment_method": "credit_card",
        "payment_details": {
            "card_number": "4242424242424242",
            "expiry_month": 12,
            "expiry_year": 2025,
            "cvc": "123"
        }
    }
    ```
-   **Response**: Returns transaction details and updated wallet balance

### Withdraw Funds

-   **URL**: `/api/wallet/withdraw`
-   **Method**: `POST`
-   **Description**: Withdraw funds from the authenticated user's wallet
-   **Authentication**: Required
-   **Request Body**:
    ```json
    {
        "amount": 50.0,
        "withdrawal_method": "bank_transfer",
        "withdrawal_details": {
            "bank_name": "Example Bank",
            "account_number": "1234567890",
            "routing_number": "987654321"
        }
    }
    ```
-   **Response**: Returns transaction details and updated wallet balance

### Get Wallet Transactions

-   **URL**: `/api/wallet/transactions`
-   **Method**: `GET`
-   **Description**: Get the authenticated user's wallet transactions
-   **Authentication**: Required
-   **Query Parameters**:
    -   `type`: Filter by transaction type (deposit, withdrawal, hold, release, payment)
    -   `per_page`: Number of transactions per page (default: 15)
-   **Response**: Returns a paginated list of transactions

### Get Wallet Holds

-   **URL**: `/api/wallet/holds`
-   **Method**: `GET`
-   **Description**: Get the authenticated user's wallet holds
-   **Authentication**: Required
-   **Query Parameters**:
    -   `status`: Filter by hold status (active, released, applied)
    -   `per_page`: Number of holds per page (default: 15)
-   **Response**: Returns a paginated list of holds

## Error Handling

All API endpoints return appropriate HTTP status codes:

-   `200 OK`: Request succeeded
-   `201 Created`: Resource created successfully
-   `400 Bad Request`: Invalid request parameters
-   `401 Unauthorized`: Authentication required
-   `403 Forbidden`: Not authorized to perform the action
-   `404 Not Found`: Resource not found
-   `422 Unprocessable Entity`: Validation errors

Error responses include a message explaining the error.
