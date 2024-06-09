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

Backend is implemented using Express. There are two endpoints available:

1. Fetching launches using the API endpoint `/launches/query`
2. Fetching rocket details using the API endpoint `/rockets/:id`

The request body for fetching launches was modified comparing to the original API for ease of use by the client side.

## Frontend

Frontend is implemented using React, TypeScript, PostCSS, CSS Modules, and Vite. Chakra UI is used to implement inputs and selects. Additionally, there are CSS variables for colors and indents.

The application has one page containing the title, filters, and launches cards. When you click on a launch card, a modal window opens with launch details and rocket information.

You can filter the output by launch status (future, success or failed), sort by name or date, search by rocket ID, or use fuzzy search by name.
