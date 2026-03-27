import { Router } from "express";
import { userThemes } from "./themes.js";

const router = Router();

/**
 * GET /api/export/:userId
 * Export complete theme configuration for frontend integration
 */
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userThemes.has(userId)) {
    return res.status(404).json({ error: "User theme not found" });
  }

  const theme = userThemes.get(userId);

  // Format for frontend integration
  const cssVariables = {
    "--primary": theme.colors.primary,
    "--primary-600": theme.colors.primary600,
    "--accent": theme.colors.accent,
    "--input-bg": theme.colors.background,
    "--input-text": theme.colors.text,
    "--input-border": theme.colors.border,
    "--font-family": theme.typography.fontFamily,
    "--base-font-size": `${theme.typography.baseFontSize}px`,
    "--line-height": theme.typography.lineHeight,
  };

  res.json({
    userId,
    theme,
    cssVariables,
    exportedAt: new Date(),
  });
});

export default router;
