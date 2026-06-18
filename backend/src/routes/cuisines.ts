import { Router } from "express";
import { 
  getAllCuisines, 
  getCuisineById, 
  createCuisine, 
  updateCuisine, 
  deleteCuisine,
  searchCuisines
} from "../controllers/cuisinesController";
import { validate, cuisineSchema } from "../middleware/validation";
 
const router = Router();

router.get("/", getAllCuisines);
router.get("/search", searchCuisines);
router.get("/:id", getCuisineById);
router.post("/", validate(cuisineSchema), createCuisine);
router.put("/:id", validate(cuisineSchema), updateCuisine);
router.delete("/:id", deleteCuisine);

export default router;
