import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    email:{
        type:String,
        required:true,
    },
    isActive: {
        type: String,
        default:1,
    },
});

export default mongoose.model("Student", studentSchema);      