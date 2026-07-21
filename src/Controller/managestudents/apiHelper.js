import { Router } from "express";
import createstudent from "./createstudent.js";

const router = Router();

router.use("/create", createstudent);

export default router;