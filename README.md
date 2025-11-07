# Note Taking API — Leighton Grant

A RESTful API for a note-taking application, built with Node.js, Express, and TypeScript. This backend service provides endpoints for creating, reading, updating, and deleting notes, with data persisted in a local JSON file.

_Please replace this with a screenshot of your application's API being tested, for example, in Postman or Insomnia._
![Preview](./public/assets/images/screenshot.png)

## Live demo

[![Live demo](https://img.shields.io/badge/Live%20Demo-View-brightgreen?style=for-the-badge)](https://note-taking-app-step8up.vercel.app/)

## Overview

This project is a backend API that serves as the foundation for a note-taking application. It exposes several endpoints to manage notes.

-   **API Entry:** `server.ts` sets up and runs the Express server.
-   **Routing:** `routes.ts` defines the API endpoints for note operations.
-   **Data Storage:** Notes are stored in `notes.json`.
-   **Validation:** Incoming request data is validated using Joi.

## Features

-   Responsive and robust RESTful API structure.
-   Full CRUD (Create, Read, Update, Delete) functionality for notes.
-   Schema validation for incoming data to ensure integrity.
-   Uses modern TypeScript with ES modules.
-   Data is stored in a simple, human-readable JSON file.

## Tech stack

-   <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge" alt="Node.js" />
-   <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge" alt="Express.js" />
-   <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript" />
-   <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" />

-   Node.js
-   Express.js
-   TypeScript
-   Joi (for validation)

## API Endpoints

| Method   | Endpoint         | Description             |
| :------- | :--------------- | :---------------------- |
| `GET`    | `/api/notes`     | Get all notes           |
| `GET`    | `/api/notes/:id` | Get a single note by ID |
| `POST`   | `/api/notes`     | Create a new note       |
| `PUT`    | `/api/notes/:id` | Update an existing note |
| `DELETE` | `/api/notes/:id` | Delete a note by ID     |

### `POST /api/notes` Body

```json
{
	"title": "My New Note",
	"noteText": "This is the content of the note."
}
```

## Quick start

1.  Clone the repository:

    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

The API will be running at `http://localhost:3000`.

## Project structure (high level)

-   `server.ts` — Main Express server setup.
-   `routes.ts` — API route definitions.
-   `notes.json` — Data store for notes.
-   `public/` — Folder for static assets.
-   `LICENSE` — Project license (MIT).

## Contributing

Small improvements are welcome: accessibility fixes, responsive tweaks, copy updates, or additional projects. Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

## Contact

For questions or feedback, you can reach the author by opening an issue in this repository.
