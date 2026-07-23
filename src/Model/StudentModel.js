import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rollno: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        isActive: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const Student =
    mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;