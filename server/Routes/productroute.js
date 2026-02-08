import express from "express";
import { getAll, save } from "../Controller/productcontroller.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", save);

export default router;
