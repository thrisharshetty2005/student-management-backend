import { Router } from "express";
import StudentModel from "../../Model/StudentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { name, rollno, phone, email } = req.body;

        if (!name) {
            return send(res,setErrMsg(RESPONSE.REQUIRED,"name"))
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

        return send(res,RESPONSE.SUCCESS)

    } catch (error) {
        console.log("Create Student:", error);

        return send(res,RESPONSE.UNK_ERR)
    }
});

export default router;