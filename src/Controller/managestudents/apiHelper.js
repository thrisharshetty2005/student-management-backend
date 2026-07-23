import { Router } from "express";
import createstudent from "./createstudent.js";
import liststudents from "./liststudents.js";
import editstudent from "./editstudent.js";
import deletestudent from "./deletestudent.js"

const router = Router();

router.use("/create", createstudent);
router.use("/list", liststudents);
router.use("/edit", editstudent);
router.use("/delete", deletestudent);

export default router;