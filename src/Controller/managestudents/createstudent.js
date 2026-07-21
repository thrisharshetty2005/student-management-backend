import { Router } from "express";
import StudentModel from "../../Model/StudentModel.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { name, rollno, phone, email } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (!rollno) {
            return res.status(400).json({
                success: false,
                message: "Roll No is required"
            });
        }

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        await StudentModel.create({
            name,
            rollno,
            phone,
            email,
        });

        return res.status(200).json({
            success: true,
            message: "Student created successfully",
        });

    } catch (error) {
        console.log("Create Student:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

export default router;