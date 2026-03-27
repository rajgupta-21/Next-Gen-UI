import { Router } from "express";

const router = Router();

/**
 * GET /health
 * Health check endpoint
 */
router.get("/", (req, res) => {
  res.json({ status: "Backend is running", timestamp: new Date() });
});

export default router;
