import { Router } from "express";
import { userThemes } from "./themes.js";

const router = Router();

/**
 * GET /api/components/:userId
 * Fetch user's custom component settings
 */
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userThemes.has(userId)) {
    return res.status(404).json({ error: "User theme not found" });
  }

  const theme = userThemes.get(userId);
  res.json(theme.components || {});
});

/**
 * POST /api/components/:userId/:componentName
 * Save custom settings for a specific component
 */
router.post("/:userId/:componentName", (req, res) => {
  const { userId, componentName } = req.params;
  const customSettings = req.body;

  if (!userThemes.has(userId)) {
    return res.status(404).json({ error: "User theme not found" });
  }

  const theme = userThemes.get(userId);

  if (!theme.components) {
    theme.components = {};
  }

  theme.components[componentName] = {
    ...theme.components[componentName],
    ...customSettings,
    updatedAt: new Date(),
  };

  userThemes.set(userId, theme);
  res.json({
    message: `${componentName} settings saved`,
    settings: theme.components[componentName],
  });
});

/**
 * GET /api/components/:userId/:componentName
 * Get custom settings for a specific component
 */
router.get("/:userId/:componentName", (req, res) => {
  const { userId, componentName } = req.params;

  if (!userThemes.has(userId)) {
    return res.status(404).json({ error: "User theme not found" });
  }

  const theme = userThemes.get(userId);
  const componentSettings = theme.components?.[componentName];

  if (!componentSettings) {
    return res
      .status(404)
      .json({ error: `No custom settings for ${componentName}` });
  }

  res.json(componentSettings);
});

/**
 * POST /api/components/:userId/button/customize
 * Example: Customize button with text size, spacing, shadows, etc.
 */
router.post("/:userId/button/customize", (req, res) => {
  const { userId } = req.params;
  const {
    textSize,
    textTransform,
    letterSpacing,
    fontWeight,
    borderRadius,
    padding,
    boxShadow,
    hoverEffect,
    transition,
  } = req.body;

  if (!userThemes.has(userId)) {
    return res.status(404).json({ error: "User theme not found" });
  }

  const theme = userThemes.get(userId);

  const buttonConfig = {
    textSize: textSize || "1rem",
    textTransform: textTransform || "none",
    letterSpacing: letterSpacing || "0",
    fontWeight: fontWeight || 500,
    borderRadius: borderRadius || "0.5rem",
    padding: padding || { x: "1rem", y: "0.5rem" },
    boxShadow: boxShadow || "none",
    hoverEffect: hoverEffect || "opacity",
    transition: transition || "all 200ms ease-in-out",
  };

  if (!theme.components) {
    theme.components = {};
  }

  theme.components.button = buttonConfig;
  userThemes.set(userId, theme);

  res.json({
    message: "Button customization saved",
    buttonConfig,
  });
});

/**
 * POST /api/components/:userId/input/customize
 * Example: Customize input with border, focus effects, size, etc.
 */
router.post("/:userId/input/customize", (req, res) => {
  const { userId } = req.params;
  const {
    borderWidth,
    borderRadius,
    padding,
    fontSize,
    focusBorderColor,
    focusShadow,
    backgroundColor,
    textColor,
    placeholder,
  } = req.body;

  if (!userThemes.has(userId)) {
    return res.status(404).json({ error: "User theme not found" });
  }

  const theme = userThemes.get(userId);

  const inputConfig = {
    borderWidth: borderWidth || "1px",
    borderRadius: borderRadius || "0.375rem",
    padding: padding || { x: "0.75rem", y: "0.5rem" },
    fontSize: fontSize || "1rem",
    focusBorderColor: focusBorderColor || "var(--primary)",
    focusShadow: focusShadow || "0 0 0 3px rgba(59, 130, 246, 0.1)",
    backgroundColor: backgroundColor || "var(--input-bg, #ffffff)",
    textColor: textColor || "var(--input-text, #111111)",
    placeholder: placeholder || "0.5",
  };

  if (!theme.components) {
    theme.components = {};
  }

  theme.components.input = inputConfig;
  userThemes.set(userId, theme);

  res.json({
    message: "Input customization saved",
    inputConfig,
  });
});

/**
 * POST /api/components/:userId/card/customize
 * Example: Customize card with shadows, padding, border, etc.
 */
router.post("/:userId/card/customize", (req, res) => {
  const { userId } = req.params;
  const { padding, borderRadius, boxShadow, borderWidth, backgroundColor } =
    req.body;

  if (!userThemes.has(userId)) {
    return res.status(404).json({ error: "User theme not found" });
  }

  const theme = userThemes.get(userId);

  const cardConfig = {
    padding: padding || "1.5rem",
    borderRadius: borderRadius || "1rem",
    boxShadow:
      boxShadow ||
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    borderWidth: borderWidth || "0px",
    backgroundColor: backgroundColor || "var(--card-bg, #ffffff)",
  };

  if (!theme.components) {
    theme.components = {};
  }

  theme.components.card = cardConfig;
  userThemes.set(userId, theme);

  res.json({
    message: "Card customization saved",
    cardConfig,
  });
});

export default router;
