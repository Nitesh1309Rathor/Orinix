import cors from "cors";
import express from "express";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  }),
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.status(200).json({
    success: true,
    service: "orionix-backend",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

export default app;
