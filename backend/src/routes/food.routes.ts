import { Router } from "express";
import {
  getAllFoods,
  getAllTags,
  getFoodBySearchTerm,
  getFoodByTagName,
  getFoodDetails,
} from "../controllers/food.controller";

const router = Router();

router.get("/", getAllFoods);
router.get("/search/:searchTerm", getFoodBySearchTerm);
router.get("/tags", getAllTags);
router.get("/tag/:tagName", getFoodByTagName);
router.get("/:foodId", getFoodDetails);

export default router;
