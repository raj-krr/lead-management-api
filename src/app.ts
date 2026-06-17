import express from "express";

import leadRoutes from "./routes/lead.routes";

const app = express();

app.use(express.json());

app.use("/api/leads", leadRoutes);

export default app;