import express from "express";

import leadRoutes from "./routes/lead.routes";
import importRoutes from "./routes/import.routes";

import { limiter } from "./middleware/rateLimit.middleware";
import { apiKeyAuth } from "./middleware/apiKey.middleware";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

const swaggerDocument =
  YAML.load("./swagger/swagger.yaml");

app.set("trust proxy", 1);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(express.json());

app.use(limiter);

app.use(apiKeyAuth);

app.use("/api/leads", leadRoutes);

app.use("/api/import", importRoutes);

export default app;