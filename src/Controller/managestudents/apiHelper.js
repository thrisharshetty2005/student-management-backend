import { Router } from "express";
import createstudent from "./createstudent.js";
import liststudents from "./liststudents.js";

const router = Router();

router.use("/create", createstudent);
router.use("/list", liststudents);

export default router;