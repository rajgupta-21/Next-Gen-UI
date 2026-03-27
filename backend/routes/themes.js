import { Router } from "express";

const router = Router();

// In-memory database (should be moved to actual DB)
export const userThemes = new Map();

/**
 * GET /api/themes/:userId
 * Fetch user's custom theme
 */
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const theme = userThemes.get(userId);

  if (!theme) {
    return res.status(404).json({ error: "Theme not found" });
  }

  res.json(theme);
});

/**
 * POST /api/themes/:userId
 * Save or update user's custom theme
 */
router.post("/:userId", (req, res) => {
  const { userId } = req.params;
  const themeData = req.body;

  // Validate theme structure
  if (!themeData.colors || !themeData.typography) {
    return res.status(400).json({
      error: "Theme must include 'colors' and 'typography' objects",
    });
  }

  const theme = {
    id: userId,
    name: themeData.name || "My Custom Theme",
    createdAt: userThemes.has(userId)
      ? userThemes.get(userId).createdAt
      : new Date(),
    updatedAt: new Date(),
    colors: {
      primary: themeData.colors.primary || "#3b82f6",
      primary600: themeData.colors.primary600 || "#2563eb",
      accent: themeData.colors.accent || "#7c3aed",
      background: themeData.colors.background || "#ffffff",
      text: themeData.colors.text || "#111111",
      border: themeData.colors.border || "#e5e7eb",
    },
    typography: {
      fontFamily: themeData.typography.fontFamily || "system-ui, sans-serif",
      baseFontSize: themeData.typography.baseFontSize || 16,
      lineHeight: themeData.typography.lineHeight || 1.5,
      fontWeight: {
        light: themeData.typography.fontWeight?.light || 300,
        normal: themeData.typography.fontWeight?.normal || 400,
        semibold: themeData.typography.fontWeight?.semibold || 600,
        bold: themeData.typography.fontWeight?.bold || 700,
      },
    },
    components: themeData.components || {},
  };

  userThemes.set(userId, theme);
  res.json({ message: "Theme saved successfully", theme });
});

router.delete("/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userThemes.has(userId)) {
    return res.status(404).json({ error: "Theme not found" });
  }

  userThemes.delete(userId);
  res.json({ message: "Theme deleted successfully" });
});

export default router;
