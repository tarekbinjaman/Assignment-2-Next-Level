import express from "express";
import initDB from "./config/db";

const app = express();

// Body parser
app.use(express.json());

// initializing DB
initDB();

app.get("/", (req, res) => {
    res.send("Assignment 2 is running")
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    });
});

export default app;