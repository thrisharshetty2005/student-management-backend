import { Router } from "express";
import StudentModel from "../../Model/StudentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import { upload } from "../../middleware/uploads.js";

const router = Router();

const uploads = upload.single("image");

router.post("/", (req, res) => {
    uploads(req, res, async (error) => {
        try {
            
            if (error) {
                return send(
                    res,
                    setErrMsg(RESPONSE.MULTER_ERR, error.message)
                );
            }

            
            if (!req.file) {
                return send(
                    res,
                    setErrMsg(RESPONSE.REQUIRED, "Image")
                );
            }

            const filename = req.file.filename;

            const { name, rollno, phone, email } = req.body;

            
            if (!name) {
                return send(res, setErrMsg(RESPONSE.REQUIRED, "Name"));
            }

            if (!rollno) {
                return send(res, setErrMsg(RESPONSE.REQUIRED, "Roll Number"));
            }

            if (!phone) {
                return send(res, setErrMsg(RESPONSE.REQUIRED, "Phone"));
            }

            if (!email) {
                return send(res, setErrMsg(RESPONSE.REQUIRED, "Email"));
            }

            
            const emailRegex =
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (!emailRegex.test(email)) {
                return send(
                    res,
                    setErrMsg(RESPONSE.INVALID_ID, "Email")
                );
            }

            
            const isEmailExist = await StudentModel.findOne({ email });

            if (isEmailExist) {
                return send(
                    res,
                    setErrMsg(RESPONSE.ALREADY_EXISTS, "Email")
                );
            }

            
            const isPhoneExist = await StudentModel.findOne({ phone });

            if (isPhoneExist) {
                return send(
                    res,
                    setErrMsg(RESPONSE.ALREADY_EXISTS, "Phone")
                );
            }

            
            await StudentModel.create({
                name,
                rollno,
                phone,
                email,
                image: filename,
            });

            return send(res, RESPONSE.SUCCESS);

        } catch (err) {
            console.log("Create Student:", err);
            return send(res, RESPONSE.UNK_ERR);
        }
    });
});

export default router;