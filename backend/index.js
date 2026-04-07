import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import componentsRoutes from "./routes/components.js";
import exportRoutes from "./routes/export.js";
import generativeAIRoutes from "./routes/generativeAI.js";
import healthRoutes from "./routes/health.js";
import presetsRoutes from "./routes/presets.js";
import themesRoutes from "./routes/themes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// AI Component Generation
app.use("/api", generativeAIRoutes);

// Theme Management
app.use("/api/themes", themesRoutes);

// Component Customization
app.use("/api/components", componentsRoutes);

// Preset Management
app.use("/api/presets", presetsRoutes);

// Export Configuration
app.use("/api/export", exportRoutes);

// Health Check
app.use("/health", healthRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.get("/", (req, res) => {
  res.send("Welcome to the AI-Powered UI Component Generator API");
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(
    ` Component generator (Groq): http://localhost:${PORT}/api/generate-component`,
  );
  console.log(
    ` Ollama agent: http://localhost:${PORT}/api/generate-component-agent`,
  );
});
