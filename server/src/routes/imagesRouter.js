import express from "express"
import { getImage } from "../controllers/imagesController.js";

const router = express.Router();

router.get('/:key', getImage)

export default router