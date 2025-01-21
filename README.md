# NoteStore

NoteStore is a Django-based web application for managing and organizing your notes. It provides a simple and intuitive interface to create, edit, and delete notes.

## Features

- Create, edit, and delete notes
- Organize notes with tags
- Search notes by content or tags
- User authentication and authorization
- Responsive design for mobile and desktop

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/NoteStore.git
    cd NoteStore
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Apply migrations:
    ```bash
    python manage.py migrate
    ```

5. Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```

6. Run the development server:
    ```bash
    python manage.py runserver
    ```

7. Open your browser and go to `http://127.0.0.1:8000/` to access the application.
## Docker

You can also run NoteStore using Docker.

1. Build the Docker image:
    ```bash
    docker-compose up --build
    ```

3. Open your browser and go to `http://127.0.0.1:8000/` to access the application.
## Usage

- Register for a new account or log in with an existing account.
- Create new notes using the "New Note" button.
- Edit or delete existing notes from the notes list.
- Use tags to organize your notes and the search bar to find specific notes.
