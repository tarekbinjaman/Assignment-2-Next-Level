import express from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";

const app = express();

// Body parser
app.use(express.json());

// initializing DB
initDB();

app.get("/", (req, res) => {
    res.send("Assignment 2 is running")
});

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    });
});

export default app;