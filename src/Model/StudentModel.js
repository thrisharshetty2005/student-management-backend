import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

    rollno: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: "",
    },

    isActive: {
        type: Number,
        default: 1,
    },

}, {
    timestamps: true
});


export default mongoose.model("Student", studentSchema);