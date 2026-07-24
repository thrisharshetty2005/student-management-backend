import express from "express";
import dotenv from "dotenv";
import dns from "dns";
import { connectDB } from "./dbConnection.js";
import routes from "./routes.js";

dns.setServers(["8.8.8.8"]);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static("public/uploads"));

// Connect Database
connectDB();

// API Routes
routes(app);

// Start Server
app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});