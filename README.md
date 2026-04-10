# CompanyHub

CompanyHub is a full-stack Companies Directory project built with React, Tailwind CSS, Node.js, and Express. It lets users view, search, filter, sort, and paginate company data using a clean card-based interface.

## Folder Structure

```bash
companyhub/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       └── components/
│           ├── CompanyCard.jsx
│           ├── Filters.jsx
│           └── Pagination.jsx
├── db.json
├── package.json
└── README.md
```

## Features

- Card layout for companies
- Search by company name (case-insensitive)
- Filter by location
- Filter by industry
- Sort by company name (A-Z and Z-A)
- Pagination with 6 items per page
- Loading, error, and empty states
- Responsive UI with Tailwind CSS
- Express REST API with GET, POST, and DELETE endpoints
- Environment variable support for API URL and frontend origin

## Backend Code Explanation

- `GET /companies`: reads company data from `db.json` and returns the full array.
- `POST /companies`: validates input, creates a new `id`, saves the record, and returns the created company.
- `DELETE /companies/:id`: removes a company by `id`.
- `db.json` acts as the lightweight database file.

## Frontend Code Explanation

- `useEffect` fetches company data when the app loads.
- `useMemo` is used to calculate unique dropdown values and filtered/sorted data efficiently.
- Search, filters, sorting, and pagination are combined in a predictable order:
  1. Start with all companies.
  2. Apply search by name.
  3. Apply location and industry filters.
  4. Sort the filtered result.
  5. Slice the result for the current page.
- Whenever the user changes search, filter, or sort, the page resets to page 1.

## Tailwind Setup Steps

1. Create the frontend using Vite.
2. Install Tailwind CSS, PostCSS, and Autoprefixer.
3. Add `tailwind.config.js` and `postcss.config.js`.
4. Add Tailwind directives to `src/index.css`.
5. Configure the `content` paths so Tailwind scans `index.html` and `src/**/*.{js,jsx}`.

## Installation Commands

Run these commands from the `companyhub` root folder:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

Or install everything from the root workspace script:

```bash
npm run install:all
```

## Local Development Setup

### 1. Configure environment variables

Backend:

```bash
cd backend
cp .env.example .env
```

Frontend:

```bash
cd frontend
cp .env.example .env
```

### 2. Start the backend

```bash
cd backend
npm run dev
```

The backend runs at `http://localhost:5000`.

### 3. Start the frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend runs at `http://localhost:5173`.

### 4. Optional: run both together from root

```bash
npm run dev
```

## API Testing Examples

### Get all companies

```bash
curl http://localhost:5000/companies
```

### Add a company

```bash
curl -X POST http://localhost:5000/companies \
  -H "Content-Type: application/json" \
  -d '{"name":"BrightPath Energy","location":"Jaipur","industry":"Energy"}'
```

### Delete a company

```bash
curl -X DELETE http://localhost:5000/companies/3
```

## Deployment Guide

### Backend on Render

1. Push the project to GitHub.
2. Create a new **Web Service** on Render.
3. Set the root directory to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `PORT=5000`
   - `FRONTEND_URL=https://your-frontend-domain.vercel.app`
7. After deployment, copy the Render backend URL.

### Frontend on Vercel

1. Import the repository into Vercel.
2. Set the root directory to `frontend`.
3. Framework preset: `Vite`.
4. Add environment variable:
   - `VITE_API_URL=https://your-render-backend.onrender.com`
5. Deploy the project.

### Frontend on Netlify

1. Import the repository into Netlify.
2. Set the base directory to `frontend`.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable:
   - `VITE_API_URL=https://your-render-backend.onrender.com`
6. Deploy the project.

## Project Architecture

### Architecture Overview

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** local `db.json`
- **Communication:** frontend calls backend with Axios

### Key Decisions

- Used React hooks only, because the assignment asks for simple and beginner-friendly state handling.
- Used card layout to make the UI look modern and responsive.
- Used `useMemo` to avoid recalculating filter options and filtered company lists on every render.
- Kept the backend small and readable so the main focus remains on frontend integration.
- Used environment variables so the app is deployment-ready.

### How Filtering and Pagination Work

- Filtering happens before pagination.
- This ensures the user sees page counts based only on matching results.
- Pagination slices the filtered array using the current page and items per page.
- If filters change, the current page resets to the first page to avoid invalid page numbers.

## Interview Walkthrough Notes

Use this short explanation in your video:

- CompanyHub is split into a React frontend and an Express backend.
- The backend reads and updates company data from `db.json`.
- The frontend fetches companies once, then handles search, filtering, sorting, and pagination in memory for a fast user experience.
- The UI is built with reusable components: `Filters`, `CompanyCard`, and `Pagination`.
- I used loading, empty, and error states to improve UX and make the project production-ready.

## Submission Checklist

- Push the code to GitHub
- Deploy backend to Render
- Deploy frontend to Vercel or Netlify
- Record a 2-3 minute walkthrough video
- Share GitHub link, live link, and video with the recruiter
