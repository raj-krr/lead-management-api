import express from "express";

import leadRoutes from "./routes/lead.routes";
import importRoutes from "./routes/import.routes";

const app = express();

app.use(express.json());

app.use("/api/leads", leadRoutes);

app.use("/api/import", importRoutes);

export default app;
