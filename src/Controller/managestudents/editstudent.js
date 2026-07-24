import { Router } from "express";
import mongoose from "mongoose";
import StudentModel from "../../Model/StudentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { STATE } from "../../config/constants.js";

const router = Router();

router.put("/", async (req, res) => {
    try {
        console.log("Query:", req.query);
        console.log("Body:", req.body);

        const { student_id } = req.query;
        const { rollno, name, email, phone } = req.body;


        // Check Student ID
        if (!student_id) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "Student id"));
        }


        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(student_id)) {
            return send(res, setErrMsg(RESPONSE.INVALID_ID, "Student"));
        }


        // Find Student
        const studentData = await StudentModel.findOne({
            _id: student_id,
            isActive: STATE.ACTIVE,
        });

        if (!studentData) {
            return send(res, setErrMsg(RESPONSE.NOT_FOUND, "Student"));
        }


        // Check duplicate Roll No
        if (rollno) {
            const rollExists = await StudentModel.findOne({
                rollno,
                _id: { $ne: student_id },
                isActive: STATE.ACTIVE,
            });

            if (rollExists) {
                return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Roll No"));
            }
        }


        // Check duplicate Email
        if (email) {
            const emailExists = await StudentModel.findOne({
                email,
                _id: { $ne: student_id },
                isActive: STATE.ACTIVE,
            });

            if (emailExists) {
                return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Email"));
            }
        }


        // Update Student
        await StudentModel.updateOne(
            { _id: student_id },
            {
                $set: {
                    rollno,
                    name,
                    email,
                    phone,
                },
            }
        );


        return send(res, RESPONSE.SUCCESS);

    } catch (error) {
        console.log("Edit Student API:", error);
        return send(res, RESPONSE.UNK_ERR);
    }
});


export default router;