# UI Component Library - Personalization Backend

A Node.js/Express backend that enables users to personalize and customize UI components with advanced options like text sizes, spacing, colors, typography, and more.

## Features

✨ **User Theme Management**

- Create and save custom themes per user
- Store color palettes, typography settings, and component customizations
- Apply pre-built theme presets (Minimal, Vibrant, Dark Mode)

🎨 **Component-Level Customization**

- Customize individual components (Button, Input, Card, etc.)
- Fine-tune properties: text size, spacing, shadows, borders, transitions
- Export configuration as CSS variables for frontend integration

📦 **Preset System**

- 3 built-in presets: Minimal, Vibrant, Dark Mode
- Easy to extend with new presets
- One-click preset application

🔄 **Data Persistence**

- In-memory storage (ready to integrate with MongoDB, PostgreSQL, etc.)
- Export configurations for version control
- Theme creation and update timestamps

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Language**: JavaScript (ES modules)
- **Dependencies**: cors, dotenv
- **Development**: nodemon

## Installation

```bash
cd backend
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Edit `.env` with your settings:

```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Running the Server

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Server will start at `http://localhost:5000`

## API Endpoints

### Health Check

```
GET /health
```

Check if backend is running.

### Theme Management

#### Get User Theme

```
GET /api/themes/:userId
```

Fetch the complete theme configuration for a user.

**Response:**

```json
{
  "id": "user123",
  "name": "My Custom Theme",
  "colors": {
    "primary": "#3b82f6",
    "primary600": "#2563eb",
    "accent": "#7c3aed",
    "background": "#ffffff",
    "text": "#111111",
    "border": "#e5e7eb"
  },
  "typography": {
    "fontFamily": "system-ui, sans-serif",
    "baseFontSize": 16,
    "lineHeight": 1.5,
    "fontWeight": {
      "light": 300,
      "normal": 400,
      "semibold": 600,
      "bold": 700
    }
  },
  "components": {}
}
```

#### Create/Update Theme

```
POST /api/themes/:userId
```

**Request Body:**

```json
{
  "name": "My Custom Theme",
  "colors": {
    "primary": "#ff6b6b",
    "primary600": "#ff5252",
    "accent": "#ffd93d",
    "background": "#ffffff",
    "text": "#111111",
    "border": "#ffb3b3"
  },
  "typography": {
    "fontFamily": "'Inter', sans-serif",
    "baseFontSize": 16,
    "lineHeight": 1.6,
    "fontWeight": {
      "light": 300,
      "normal": 400,
      "semibold": 600,
      "bold": 700
    }
  }
}
```

#### Delete Theme

```
DELETE /api/themes/:userId
```

### Preset System

#### Get All Presets

```
GET /api/presets
```

**Response:**

```json
[
  {
    "id": "minimal",
    "name": "Minimal",
    "description": "Clean and simple design",
    "colors": { ... },
    "typography": { ... }
  },
  ...
]
```

#### Apply Preset

```
POST /api/presets/:userId/:presetId
```

Presets: `minimal`, `vibrant`, `dark`

### Component Customization

#### Get All Component Settings

```
GET /api/components/:userId
```

#### Get Specific Component Settings

```
GET /api/components/:userId/:componentName
```

#### Save Component Settings

```
POST /api/components/:userId/:componentName
```

**Request Body:**

```json
{
  "property": "value",
  "anotherProperty": "value"
}
```

### Component-Specific Endpoints

#### Customize Button

```
POST /api/components/:userId/button/customize
```

**Request Body:**

```json
{
  "textSize": "1rem",
  "textTransform": "uppercase",
  "letterSpacing": "0.05em",
  "fontWeight": 600,
  "borderRadius": "0.5rem",
  "padding": { "x": "1rem", "y": "0.5rem" },
  "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.15)",
  "hoverEffect": "scale",
  "transition": "all 200ms ease-in-out"
}
```

#### Customize Input

```
POST /api/components/:userId/input/customize
```

**Request Body:**

```json
{
  "borderWidth": "2px",
  "borderRadius": "0.375rem",
  "padding": { "x": "0.75rem", "y": "0.5rem" },
  "fontSize": "1rem",
  "focusBorderColor": "var(--primary)",
  "focusShadow": "0 0 0 3px rgba(59, 130, 246, 0.1)",
  "backgroundColor": "#ffffff",
  "textColor": "#111111",
  "placeholder": "0.5"
}
```

#### Customize Card

```
POST /api/components/:userId/card/customize
```

**Request Body:**

```json
{
  "padding": "1.5rem",
  "borderRadius": "1rem",
  "boxShadow": "0 1px 3px rgba(0, 0, 0, 0.1)",
  "borderWidth": "1px",
  "backgroundColor": "#ffffff"
}
```

### Export & Integration

#### Export User Configuration

```
GET /api/export/:userId
```

**Response:**

```json
{
  "userId": "user123",
  "theme": { ... },
  "cssVariables": {
    "--primary": "#3b82f6",
    "--primary-600": "#2563eb",
    "--accent": "#7c3aed",
    "--input-bg": "#ffffff",
    "--input-text": "#111111",
    "--input-border": "#e5e7eb",
    "--font-family": "system-ui, sans-serif",
    "--base-font-size": "16px",
    "--line-height": "1.5"
  },
  "exportedAt": "2026-01-16T12:34:56.789Z"
}
```

## Example Usage

### 1. Get All Available Presets

```bash
curl http://localhost:5000/api/presets
```

### 2. Apply "Vibrant" Preset to User

```bash
curl -X POST http://localhost:5000/api/presets/user123/vibrant
```

### 3. Customize Button for User

```bash
curl -X POST http://localhost:5000/api/components/user123/button/customize \
  -H "Content-Type: application/json" \
  -d '{
    "textSize": "1.125rem",
    "fontWeight": 700,
    "padding": { "x": "1.5rem", "y": "0.75rem" },
    "borderRadius": "0.75rem"
  }'
```

### 4. Export User Configuration

```bash
curl http://localhost:5000/api/export/user123
```

### 5. Integrate with Frontend

Save the exported configuration and apply to your frontend:

```tsx
// Frontend code
const response = await fetch("http://localhost:5000/api/export/user123");
const { cssVariables, theme } = await response.json();

// Apply CSS variables
Object.entries(cssVariables).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});

// Use component customizations
const buttonConfig = theme.components.button;
// Apply buttonConfig to styled components
```

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication & authorization
- [ ] Theme sharing and collaboration
- [ ] Version history & rollback
- [ ] Analytics on popular customizations
- [ ] Real-time sync with WebSockets
- [ ] Theme marketplace
- [ ] Scheduled backup system
- [ ] API rate limiting
- [ ] Advanced component customization (all 11 components)

## Database Schema (For Future Implementation)

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Themes Table
CREATE TABLE themes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255),
  colors JSONB,
  typography JSONB,
  components JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Theme History Table (for versioning)
CREATE TABLE theme_history (
  id UUID PRIMARY KEY,
  theme_id UUID REFERENCES themes(id),
  version INT,
  snapshot JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Frontend Integration Example

### React Hook for Theme Management

```tsx
import { useEffect, useState } from "react";

export function useUserTheme(userId: string) {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/themes/${userId}`);
        const data = await res.json();
        setTheme(data);

        // Apply CSS variables
        if (data?.colors) {
          Object.entries(data.colors).forEach(([key, value]: any) => {
            document.documentElement.style.setProperty(`--${key}`, value);
          });
        }
      } catch (error) {
        console.error("Failed to fetch theme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [userId]);

  return { theme, loading };
}
```

## Troubleshooting

### Port Already in Use

```bash
# Change port in .env
PORT=5001
```

### CORS Errors

Update `CORS_ORIGIN` in `.env` to match your frontend URL.

### Module Not Found

```bash
npm install
```

## Contributing

This backend is part of the UI Component Library project. Please follow the guidelines in the main project's `.cursorrules` file.

## License

MIT
