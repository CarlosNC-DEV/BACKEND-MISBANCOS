import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import asesores from "./routes/asesores.routes.js";
import tickets from "./routes/tickets.routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(asesores);
app.use(tickets);

export default app;
