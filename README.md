# Setup Instructions

## Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm i
    ```

## Backend Setup
1. Navigate to the backend directory from project root:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    composer install
    ```
3. Run migrations:
    ```bash
    php artisan migrate
    ```
4. Seed the database:
    ```bash
    php artisan db:seed
    ```

## Running the Project
1. Go to the project root directory
2. Start the development server:
    ```bash
    npm run dev
    ```
3. Go to http://localhost:5173
## Testing the Application

### UI Testing
- **Upload Files**: Select a file from your computer, choose a category, then click the upload button
- **Delete Files**: Click the delete button next to a file and confirm the deletion

### API Endpoints (Postman)
- `GET http://localhost:8000/files` - Get all files grouped by category
- `POST http://localhost:8000/files` - Upload a file (send form data with file as a file and category as text)
- `DELETE http://localhost:8000/files/{id}` - Delete a file by ID