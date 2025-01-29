import { Router } from "express";
import Positioncontroller from "../Controllers/Position.controller";

const router = Router();
router.get("/positions", Positioncontroller.getPosition);
router.post("/positions", Positioncontroller.createPosition);
router.put("/positions/:id", Positioncontroller.updatePosition);
router.delete("/positions/:id", Positioncontroller.deletePosition);
export default router;
