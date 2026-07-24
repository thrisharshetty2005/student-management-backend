import express from "express";
import { connectDB } from "./dbConnection.js";
import dotenv from "dotenv";
import dns from "dns";
import routes from "./routes.js";

dns.setServers(["8.8.8.8"]);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static("public/uploads"));

connectDB();

routes(app);

app.listen(PORT, () => {
    console.log("Server Listening on", PORT);
});