import { Router } from "express";
import mongoose from "mongoose";
import { STATE } from "../../config/constants.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import StudentModel from "../../Model/StudentModel.js";

const router = Router();

router.delete("/", async (req, res) => {
    try {
        const { student_id } = req.query;

        // Check student_id
        if (!student_id) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "Student id"));
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(student_id)) {
            return send(res, setErrMsg(RESPONSE.INVALID_ID, "Student"));
        }

        // Check if student exists
        const student = await StudentModel.findById(student_id);

        if (!student) {
            return send(res, setErrMsg(RESPONSE.NOT_FOUND, "Student"));
        }

        // Already deleted
        if (student.isActive === STATE.INACTIVE) {
            return send(res, setErrMsg(RESPONSE.NOT_FOUND, "Student"));
        }

        // Soft delete
        const updatedStudent = await StudentModel.findByIdAndUpdate(
            student_id,
            {
                $set: {
                    isActive: STATE.INACTIVE,
                },
            },
            {
                returnDocument: "after",
            }
        );

        console.log("Updated Student:", updatedStudent);

        return send(res, RESPONSE.SUCCESS);

    } catch (error) {
        console.log("Delete Student API:", error);
        return send(res, RESPONSE.UNK_ERR);
    }
});

export default router;