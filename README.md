# SpaceX Launches App

## Setup

### Start Backend

```sh
cd backend
yarn dev
```

### Start Frontend

```sh
cd frontend
yarn dev
```

## Backend

For the backend, I used Express and added two endpoints:

1. Fetching launches using the API endpoint `/launches/query`
2. Fetching rocket details using the API endpoint `/rockets/:id`

The request body for fetching launches has been modified and simplified for ease of use by the client side.

## Frontend

For the frontend, I used React, TypeScript, PostCSS, CSS Modules, and Vite. I utilized Chakra UI to implement inputs and selects. Additionally, I added CSS variables for colors and indents, and tried to implement a responsive design.

The application has one page containing the title, filters, and launches cards. When you click on a launch card, a modal window opens with launch details and rocket information.

You can filter the output by launch status (future, success or failed), sort by name or date, search by rocket ID, or use fuzzy search by name.
