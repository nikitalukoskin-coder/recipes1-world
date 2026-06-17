import { Request, Response } from "express";
import { recipes, cuisines } from "../models/store";
import crypto from "crypto";

export const getAllRecipes = (req: Request, res: Response) => {
  const { cuisineId } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  let filtered = recipes;
  
  if (cuisineId) {
    filtered = filtered.filter((r) => r.cuisineId === cuisineId);
  }
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = filtered.slice(start, end);
  
  res.json({
    items,
    total: filtered.length,
    page,
    pages: Math.ceil(filtered.length / limit),
  });
};

export const getRecipeById = (req: Request, res: Response) => {
  const { id } = req.params;
  const recipe = recipes.find((r) => r.id === id);
  
  if (!recipe) {
    return res.status(404).json({ error: "Рецепт не найден" });
  }
  
  res.json(recipe);
};

export const createRecipe = (req: Request, res: Response) => {
  const { title, cookingTime, difficulty, ingredients, description, isVegetarian, cuisineId } = req.body;
  
  // Проверяем существование кухни
  const cuisine = cuisines.find((c) => c.id === cuisineId);
  if (!cuisine) {
    return res.status(422).json({ error: "Кухня не найдена" });
  }
  
  const newRecipe = {
    id: crypto.randomUUID(),
    title,
    cookingTime,
    difficulty,
    ingredients,
    description: description || "",
    isVegetarian: isVegetarian || false,
    cuisineId,
    createdAt: new Date().toISOString(),
  };
  
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
};

export const updateRecipe = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, cookingTime, difficulty, ingredients, description, isVegetarian, cuisineId } = req.body;
  
  const index = recipes.findIndex((r) => r.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Рецепт не найден" });
  }
  
  // Проверяем существование кухни, если передана
  if (cuisineId) {
    const cuisine = cuisines.find((c) => c.id === cuisineId);
    if (!cuisine) {
      return res.status(422).json({ error: "Кухня не найдена" });
    }
  }
  
  recipes[index] = { 
    ...recipes[index], 
    title, 
    cookingTime, 
    difficulty, 
    ingredients, 
    description, 
    isVegetarian, 
    cuisineId 
  };
  
  res.json(recipes[index]);
};

export const deleteRecipe = (req: Request, res: Response) => {
  const { id } = req.params;
  
  const index = recipes.findIndex((r) => r.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Рецепт не найден" });
  }
  
  recipes.splice(index, 1);
  res.status(204).send();
};

export const searchRecipes = (req: Request, res: Response) => {
  const { q } = req.query;
  
  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Параметр q обязателен" });
  }
  
  const results = recipes.filter((r) =>
    r.title.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({
    items: results,
    total: results.length,
    page: 1,
    pages: 1,
  });
};