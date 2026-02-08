import express from "express";
import { getAll, save } from "../Controller/usercontroller.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", save);

export default router;
