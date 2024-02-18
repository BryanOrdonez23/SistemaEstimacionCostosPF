import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import proyectRoutes from './routes/proyect.routes.js';
import proyectShareRoutes from './routes/share.routes.js';
import proyectFunctionRoutes from './routes/functions.routes.js';
import adminRoutes from './routes/admin.routes.js';
import pfroutes from './routes/pf.routes.js';
import involucradosRoutes from './routes/involucrados.routes.js';
import otrosGastos from './routes/otrosGastos.routes.js';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'http://localhost:4173',
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", proyectRoutes);
app.use("/api", proyectShareRoutes);
app.use("/api", proyectFunctionRoutes);
app.use("/api", pfroutes);
app.use("/api/admin", adminRoutes);
app.use("/api", involucradosRoutes);
app.use("/api", otrosGastos);

export default app;
