# Project Requirements

This document outlines the software and hardware requirements necessary to develop, run, and deploy the UI Component Library and Website Builder project.

## 1. Hardware Requirements

### Developer Machine
*   **Processor**: Modern multi-core processor (e.g., Apple M1/M2/M3, Intel Core i5/i7/i9 10th gen+, AMD Ryzen 5000+).
*   **RAM**: Minimum 8GB (16GB recommended for running Frontend + Backend + Browser comfortably).
*   **Storage**: At least 1GB of free space for project files and `node_modules`.
*   **Operating System**: macOS, Windows 10/11, or Linux (Ubuntu 20.04+).

### Network
*   **Internet Connection**: Reliable broadband connection is **required** for:
    *   Installing dependencies (`npm`/`pnpm`).
    *   Backend AI generation (calls to Groq API).
    *   Frontend Sandbox environment (fetches Tailwind CSS and dependencies from CDN).

## 2. Software Requirements

### Core Runtime
*   **Node.js**: Version 18.0.0 or higher (Required for `fetch` API support and Next.js 15).
    *   Recommended: LTS v20.x or v22.x.
*   **Package Manager**: `npm` (comes with Node) or `pnpm` (highly recommended for monorepos, though this project uses separate folders).
    *   *Note: Frontend `package.json` references `pnpm build`, suggesting `pnpm` usage.*

### Frontend Environment
*   **Framework**: Next.js 15.5.4
*   **Library**: React 19.1.0 / DOM 19.1.0
*   **Styling**: Tailwind CSS v4.x
*   **Browser**: Modern web browser with JavaScript enabled (Chrome, Firefox, Safari, Edge).
    *   *Note: Features like Drag-and-Drop and Sandpack require modern browser APIs.*

### Backend Environment
*   **Runtime**: Node.js
*   **Framework**: Express 4.18.2
*   **Tools**: `nodemon` (for development hot-reloading).

### Database
*   **Current State**: No external database required (In-memory storage & LocalStorage used).
*   **Future**: PostgreSQL or MongoDB recommended for production persistence of themes and components.

## 3. Environment Variables & API Keys

To run the full feature set, you must configure the following environment variables.

### Backend (`/backend/.env`)
Create a `.env` file in the `backend` directory with the following:

```env
PORT=5004
GROQ_API_KEY=gsk_...  # REQUIRED: Get key from https://console.groq.com
# OPENAI_API_KEY=sk-... # OPTIONAL: Legacy/Alternative support (not currently active in default route)
```

**Note:** The application uses the **Llama 3.3-70b-versatile** model via Groq for high-speed UI generation.

## 4. Port Allocations
Ensure these ports are free on your local machine:
*   **Frontend**: `3000` (Default Next.js port)
*   **Backend**: `5004` (API Server)
*   **Storybook**: `6006` (Component documentation)

## 5. Installation Instructions

1.  **Clone the repository.**
2.  **Install Frontend Dependencies**:
    ```bash
    cd frontend/ui-component-library
    npm install
    # or
    pnpm install
    ```
3.  **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    ```
4.  **Set up Environment Variables** (see Section 3).
5.  **Run the Project**:
    *   frontend: `npm run dev`
    *   backend: `npm run dev`
