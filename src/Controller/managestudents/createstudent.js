import { Router } from "express";
import StudentModel from "../../Model/StudentModel.js";
import { upload } from "../../middleware/uploads.js";

const router = Router();

const uploads = upload.single("image");

router.post("/", (req, res) => {

    uploads(req, res, async (error) => {
        try {

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }

            const { rollno, name, email, phone } = req.body;


            if (!rollno) {
                return res.status(400).json({
                    success: false,
                    message: "Roll No is required",
                });
            }


            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: "Name is required",
                });
            }


            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email is required",
                });
            }


            if (!phone) {
                return res.status(400).json({
                    success: false,
                    message: "Phone is required",
                });
            }


            let filename = "";

            if (req.file) {
                filename = req.file.filename;
            }


            await StudentModel.create({
                rollno,
                name,
                email,
                phone,
                image: filename,
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

});


export default router;