import { Router } from "express";
import StudentModel from "../../Model/StudentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";

const router = Router();

router.put("/", async (req, res) => {
    try {
        const { student_id } = req.query;
        const { name, rollno, phone, email } = req.body;

        if (!student_id) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "Student id"));
        }

        const updates = {};

        if (name) {
            updates.name = name;
        }

        if (rollno) {
            updates.rollno = rollno;
        }

        if (email) {
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (!emailRegex.test(email)) {
                return send(res, setErrMsg(RESPONSE.INVALID_ID, "Email"));
            }

            const emailExist = await StudentModel.findOne({
                email,
                _id: { $ne: student_id }
            });

            if (emailExist) {
                return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Email"));
            }

            updates.email = email;
        }

        if (phone) {
            const phoneExist = await StudentModel.findOne({
                phone,
                _id: { $ne: student_id }
            });

            if (phoneExist) {
                return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Phone"));
            }

            updates.phone = phone;
        }

        await StudentModel.findByIdAndUpdate(student_id, updates);

        return send(res, RESPONSE.SUCCESS);

    } catch (error) {
        console.log("Update Student:", error);
        return send(res, RESPONSE.UNK_ERR);
    }
});

export default router;