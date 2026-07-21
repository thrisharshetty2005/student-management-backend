import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
        .connect(process.env.DB_CONNECTION, {
            dbName: process.env.DB_NAME,
        })
        .then(() => {
            console.log("Database Connected");
        })
        .catch((err) => {
            console.log("Error while Connecting DB:", err);
        });
};   