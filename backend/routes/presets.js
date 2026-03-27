import { Router } from "express";
import { PRESETS } from "../constant/const.js";
import { userThemes } from "./themes.js";

const router = Router();

/**
 * GET /api/presets
 * Get all available presets
 */
router.get("/", (req, res) => {
  const presets = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple design",
      ...PRESETS.minimal,
    },
    {
      id: "vibrant",
      name: "Vibrant",
      description: "Bold and colorful design",
      ...PRESETS.vibrant,
    },
    {
      id: "dark",
      name: "Dark Mode",
      description: "Dark theme for comfortable viewing",
      ...PRESETS.dark,
    },
  ];

  res.json(presets);
});

/**
 * POST /api/presets/:userId/:presetId
 * Apply a preset to user's theme
 */
router.post("/:userId/:presetId", (req, res) => {
  const { userId, presetId } = req.params;

  if (!PRESETS[presetId]) {
    return res.status(404).json({ error: "Preset not found" });
  }

  const presetData = PRESETS[presetId];

  // Create or update theme
  const theme = userThemes.get(userId) || {
    id: userId,
    name: `Theme from ${presetId} preset`,
    components: {},
  };

  theme.colors = presetData.colors;
  theme.typography = presetData.typography;
  theme.updatedAt = new Date();

  userThemes.set(userId, theme);

  res.json({
    message: `Preset '${presetId}' applied successfully`,
    theme,
  });
});

export default router;
