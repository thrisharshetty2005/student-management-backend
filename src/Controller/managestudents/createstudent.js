import { Router } from "express";
import StudentModel from "../../Model/StudentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { name, rollno, phone, email } = req.body;

        // Required field validations
        if (!name) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "name"));
        }

        if (!rollno) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "rollno"));
        }

        if (!phone) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "phone"));
        }

        if (!email) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
        }

        // Email format validation
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(email)) {
            return send(res, setErrMsg(RESPONSE.INVALID_ID, "email"));
        }

        // Check if email already exists
        const isEmailExist = await StudentModel.findOne({ email });

        if (isEmailExist) {
            return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Email"));
        }

        // Check if phone already exists
        const isPhoneExist = await StudentModel.findOne({ phone });

        if (isPhoneExist) {
            return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Phone"));
        }

        // Create student
        await StudentModel.create({
            name,
            rollno,
            phone,
            email,
        });

        return send(res, RESPONSE.SUCCESS);

    } catch (error) {
        console.log("Create Student:", error);
        return send(res, RESPONSE.UNK_ERR);
    }
});

export default router;