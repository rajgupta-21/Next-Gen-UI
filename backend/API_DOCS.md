# Backend API Documentation

**Base URL:** `http://localhost:5000`

---

## Table of Contents

1. [Health Check](#health-check)
2. [Theme Management](#theme-management)
3. [Preset System](#preset-system)
4. [Component Customization](#component-customization)
5. [Export & Integration](#export--integration)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting-future)

---

## Health Check

### GET /health

Check if the backend is running.

**Response:**

```json
{
  "status": "Backend is running",
  "timestamp": "2026-01-16T18:30:45.123Z"
}
```

---

## Theme Management

### GET /api/themes/:userId

Retrieve the complete theme configuration for a user.

**Parameters:**

- `userId` (string, path): Unique user identifier

**Response:**

```json
{
  "id": "user123",
  "name": "My Custom Theme",
  "createdAt": "2026-01-16T10:00:00.000Z",
  "updatedAt": "2026-01-16T18:30:00.000Z",
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

**Error Responses:**

- `404 Not Found`: Theme doesn't exist
- `400 Bad Request`: Invalid userId format

---

### POST /api/themes/:userId

Create or update a user's theme.

**Parameters:**

- `userId` (string, path): Unique user identifier

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

**Response:**

```json
{
  "message": "Theme saved successfully",
  "theme": {
    /* complete theme object */
  }
}
```

**Validation Rules:**

- `colors` object is required
- `typography` object is required
- All color values should be valid hex codes
- `baseFontSize` should be between 12-24 pixels

**Error Responses:**

- `400 Bad Request`: Missing required fields
- `422 Unprocessable Entity`: Invalid color format

---

### DELETE /api/themes/:userId

Delete a user's theme.

**Parameters:**

- `userId` (string, path): Unique user identifier

**Response:**

```json
{
  "message": "Theme deleted successfully"
}
```

**Error Responses:**

- `404 Not Found`: Theme doesn't exist

---

## Preset System

### GET /api/presets

Get all available theme presets.

**Response:**

```json
[
  {
    "id": "minimal",
    "name": "Minimal",
    "description": "Clean and simple design",
    "colors": {
      "primary": "#000000",
      "primary600": "#333333",
      "accent": "#666666",
      "background": "#ffffff",
      "text": "#111111",
      "border": "#e5e7eb"
    },
    "typography": {
      "fontFamily": "system-ui, sans-serif",
      "baseFontSize": 14,
      "lineHeight": 1.4,
      "fontWeight": {
        "light": 300,
        "normal": 400,
        "semibold": 600,
        "bold": 700
      }
    }
  },
  {
    "id": "vibrant",
    "name": "Vibrant",
    "description": "Bold and colorful design",
    "colors": {
      "primary": "#ff6b6b",
      "primary600": "#ff5252",
      "accent": "#ffd93d",
      "background": "#ffffff",
      "text": "#1a1a1a",
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
        "bold": 800
      }
    }
  },
  {
    "id": "dark",
    "name": "Dark Mode",
    "description": "Dark theme for comfortable viewing",
    "colors": {
      "primary": "#3b82f6",
      "primary600": "#2563eb",
      "accent": "#a78bfa",
      "background": "#1f2937",
      "text": "#f3f4f6",
      "border": "#374151"
    },
    "typography": {
      "fontFamily": "'Fira Code', monospace",
      "baseFontSize": 15,
      "lineHeight": 1.5,
      "fontWeight": {
        "light": 300,
        "normal": 400,
        "semibold": 600,
        "bold": 700
      }
    }
  }
]
```

---

### POST /api/presets/:userId/:presetId

Apply a preset theme to a user.

**Parameters:**

- `userId` (string, path): Unique user identifier
- `presetId` (string, path): Preset ID (`minimal`, `vibrant`, `dark`)

**Response:**

```json
{
  "message": "Preset 'dark' applied successfully",
  "theme": {
    /* complete theme object with preset values */
  }
}
```

**Error Responses:**

- `404 Not Found`: Preset doesn't exist
- `400 Bad Request`: Invalid presetId

---

## Component Customization

### GET /api/components/:userId

Get all component customizations for a user.

**Parameters:**

- `userId` (string, path): Unique user identifier

**Response:**

```json
{
  "button": {
    "textSize": "1.125rem",
    "fontWeight": 600,
    "borderRadius": "0.75rem",
    "updatedAt": "2026-01-16T18:30:00.000Z"
  },
  "input": {
    "borderWidth": "2px",
    "borderRadius": "0.375rem",
    "updatedAt": "2026-01-16T18:25:00.000Z"
  }
}
```

**Error Responses:**

- `404 Not Found`: User theme doesn't exist

---

### GET /api/components/:userId/:componentName

Get customization settings for a specific component.

**Parameters:**

- `userId` (string, path): Unique user identifier
- `componentName` (string, path): Component name (button, input, card, etc.)

**Response:**

```json
{
  "textSize": "1.125rem",
  "fontWeight": 600,
  "borderRadius": "0.75rem",
  "updatedAt": "2026-01-16T18:30:00.000Z"
}
```

**Error Responses:**

- `404 Not Found`: Component settings don't exist

---

### POST /api/components/:userId/:componentName

Save custom settings for a component.

**Parameters:**

- `userId` (string, path): Unique user identifier
- `componentName` (string, path): Component name

**Request Body:**

```json
{
  "property1": "value1",
  "property2": "value2"
}
```

**Response:**

```json
{
  "message": "button settings saved",
  "settings": {
    /* updated component settings */
  }
}
```

---

## Component-Specific Endpoints

### POST /api/components/:userId/button/customize

Customize button component properties.

**Parameters:**

- `userId` (string, path): Unique user identifier

**Request Body:**

```json
{
  "textSize": "1rem",
  "textTransform": "uppercase",
  "letterSpacing": "0.05em",
  "fontWeight": 600,
  "borderRadius": "0.5rem",
  "padding": {
    "x": "1rem",
    "y": "0.5rem"
  },
  "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.15)",
  "hoverEffect": "scale",
  "transition": "all 200ms ease-in-out"
}
```

**Available Options:**

- `textSize`: CSS font-size (e.g., "0.875rem", "1rem", "1.125rem")
- `textTransform`: "none", "uppercase", "lowercase", "capitalize"
- `letterSpacing`: CSS letter-spacing (e.g., "0.05em")
- `fontWeight`: Number 100-900
- `borderRadius`: CSS border-radius (e.g., "0.5rem")
- `padding`: Object with `x` and `y` for horizontal/vertical padding
- `boxShadow`: CSS box-shadow value
- `hoverEffect`: "opacity", "scale", "lift"
- `transition`: CSS transition value

**Response:**

```json
{
  "message": "Button customization saved",
  "buttonConfig": {
    /* updated settings */
  }
}
```

---

### POST /api/components/:userId/input/customize

Customize input component properties.

**Parameters:**

- `userId` (string, path): Unique user identifier

**Request Body:**

```json
{
  "borderWidth": "1px",
  "borderRadius": "0.375rem",
  "padding": {
    "x": "0.75rem",
    "y": "0.5rem"
  },
  "fontSize": "1rem",
  "focusBorderColor": "var(--primary)",
  "focusShadow": "0 0 0 3px rgba(59, 130, 246, 0.1)",
  "backgroundColor": "#ffffff",
  "textColor": "#111111",
  "placeholder": "0.5"
}
```

**Response:**

```json
{
  "message": "Input customization saved",
  "inputConfig": {
    /* updated settings */
  }
}
```

---

### POST /api/components/:userId/card/customize

Customize card component properties.

**Parameters:**

- `userId` (string, path): Unique user identifier

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

**Response:**

```json
{
  "message": "Card customization saved",
  "cardConfig": {
    /* updated settings */
  }
}
```

---

## Export & Integration

### GET /api/export/:userId

Export complete user theme as CSS variables for frontend integration.

**Parameters:**

- `userId` (string, path): Unique user identifier

**Response:**

```json
{
  "userId": "user123",
  "theme": {
    "id": "user123",
    "name": "My Custom Theme",
    "colors": {
      /* ... */
    },
    "typography": {
      /* ... */
    },
    "components": {
      /* ... */
    }
  },
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
  "exportedAt": "2026-01-16T18:30:45.123Z"
}
```

**Usage in Frontend:**

```typescript
const response = await fetch("http://localhost:5000/api/export/user123");
const { cssVariables } = await response.json();

// Apply CSS variables to DOM
Object.entries(cssVariables).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, String(value));
});
```

**Error Responses:**

- `404 Not Found`: User theme doesn't exist

---

## Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Error Codes

| Status | Error                 | Cause                              |
| ------ | --------------------- | ---------------------------------- |
| 400    | Bad Request           | Invalid request body or parameters |
| 404    | Not Found             | Resource doesn't exist             |
| 422    | Unprocessable Entity  | Validation failed                  |
| 500    | Internal Server Error | Server error (check logs)          |

### Example Error Responses

**400 - Missing Required Fields:**

```json
{
  "error": "Theme must include 'colors' and 'typography' objects"
}
```

**404 - Theme Not Found:**

```json
{
  "error": "Theme not found"
}
```

**404 - Component Settings Not Found:**

```json
{
  "error": "No custom settings for button"
}
```

---

## Rate Limiting (Future)

Current implementation has no rate limiting. Future versions will include:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642341245
```

---

## CORS Headers

The backend includes CORS support. By default:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

To modify, update `CORS_ORIGIN` in `.env`

---

## Best Practices

### 1. Always Include userId

Every request requires a userId parameter for user isolation.

### 2. Validate Data Before Sending

```typescript
// Good ✅
const isValidColor = /^#[0-9A-F]{6}$/i.test(color);
if (isValidColor) {
  // Send to API
}

// Bad ❌
await fetch("/api/themes/user", { body: colorFromUser });
```

### 3. Handle Errors Gracefully

```typescript
try {
  const response = await fetch("/api/themes/user123");
  if (!response.ok) {
    const error = await response.json();
    console.error("API Error:", error.error);
  }
} catch (error) {
  console.error("Network Error:", error);
}
```

### 4. Cache Theme Data Locally

```typescript
// Store theme in localStorage to reduce API calls
localStorage.setItem("userTheme", JSON.stringify(theme));
```

### 5. Debounce Updates

```typescript
// Don't send request on every keystroke
const debouncedUpdate = debounce((color) => {
  updateTheme({ colors: { primary: color } });
}, 500);
```

---

## Examples

### cURL Examples

**Get Theme:**

```bash
curl http://localhost:5000/api/themes/user123
```

**Create Theme:**

```bash
curl -X POST http://localhost:5000/api/themes/user123 \
  -H "Content-Type: application/json" \
  -d '{
    "colors": { "primary": "#ff6b6b" },
    "typography": { "baseFontSize": 16 }
  }'
```

**Apply Preset:**

```bash
curl -X POST http://localhost:5000/api/presets/user123/dark
```

**Customize Button:**

```bash
curl -X POST http://localhost:5000/api/components/user123/button/customize \
  -H "Content-Type: application/json" \
  -d '{
    "textSize": "1.125rem",
    "fontWeight": 700
  }'
```

### JavaScript Examples

**Fetch & Apply Theme:**

```javascript
async function loadUserTheme(userId) {
  const response = await fetch(`/api/export/${userId}`);
  const { cssVariables } = await response.json();

  Object.entries(cssVariables).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
```

**Update Theme:**

```javascript
async function updateUserTheme(userId, updates) {
  const response = await fetch(`/api/themes/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
}
```

---

## Version History

### v1.0.0 (Current)

- Initial release
- Theme management
- Preset system
- Component customization
- CSS variable export

### Future Versions

- Database integration
- User authentication
- Theme versioning
- Collaborative editing
- Theme marketplace
- Real-time sync
