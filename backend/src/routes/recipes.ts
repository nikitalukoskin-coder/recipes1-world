import { Router } from "express";
import { 
  getAllRecipes, 
  getRecipeById, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe,
  searchRecipes
} from "../controllers/recipesController";
import { validate, recipeSchema } from "../middleware/validation";
 
const router = Router();

router.get("/", getAllRecipes);
router.get("/search", searchRecipes);
router.get("/:id", getRecipeById);
router.post("/", validate(recipeSchema), createRecipe);
router.put("/:id", validate(recipeSchema), updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
