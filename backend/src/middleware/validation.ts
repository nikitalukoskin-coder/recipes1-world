import { Request, Response, NextFunction } from "express";
import { z } from "zod";
 
export const cuisineSchema = z.object({
  name: z.string().min(2, "Название минимум 2 символа"),
  country: z.string().min(2, "Страна минимум 2 символа"),
  description: z.string().optional(),
  isPopular: z.boolean().default(false),
});

export const recipeSchema = z.object({
  title: z.string().min(2, "Название минимум 2 символа"),
  cookingTime: z.number().min(1, "Время должно быть больше 0"),
  difficulty: z.string(),
  ingredients: z.string().min(2, "Ингредиенты минимум 2 символа"),
  description: z.string().optional(),
  isVegetarian: z.boolean().default(false),
  cuisineId: z.string(),
});

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ 
          error: "Ошибка валидации", 
          details: error.errors 
        });
      }
      return res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  };
};
