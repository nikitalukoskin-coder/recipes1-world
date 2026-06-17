import { Request, Response } from "express";
import { cuisines, recipes } from "../models/store";
import crypto from "crypto";

export const getAllCuisines = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = cuisines.slice(start, end);
  
  res.json({
    items,
    total: cuisines.length,
    page,
    pages: Math.ceil(cuisines.length / limit),
  });
};

export const getCuisineById = (req: Request, res: Response) => {
  const { id } = req.params;
  const cuisine = cuisines.find((c) => c.id === id);
  
  if (!cuisine) {
    return res.status(404).json({ error: "Кухня не найдена" });
  }
  
  res.json(cuisine);
};

export const createCuisine = (req: Request, res: Response) => {
  const { name, country, description, isPopular } = req.body;
  
  const newCuisine = {
    id: crypto.randomUUID(),
    name,
    country,
    description: description || "",
    isPopular: isPopular || false,
    createdAt: new Date().toISOString(),
  };
  
  cuisines.push(newCuisine);
  res.status(201).json(newCuisine);
};

export const updateCuisine = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, country, description, isPopular } = req.body;
  
  const index = cuisines.findIndex((c) => c.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Кухня не найдена" });
  }
  
  cuisines[index] = { 
    ...cuisines[index], 
    name, 
    country, 
    description, 
    isPopular 
  };
  
  res.json(cuisines[index]);
};

export const deleteCuisine = (req: Request, res: Response) => {
  const { id } = req.params;
  
  const index = cuisines.findIndex((c) => c.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Кухня не найдена" });
  }
  
  cuisines.splice(index, 1);
  
  // Удаляем все рецепты этой кухни
  for (let i = recipes.length - 1; i >= 0; i--) {
    if (recipes[i].cuisineId === id) {
      recipes.splice(i, 1);
    }
  }
  
  res.status(204).send();
};

export const searchCuisines = (req: Request, res: Response) => {
  const { q } = req.query;
  
  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Параметр q обязателен" });
  }
  
  const results = cuisines.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase()) ||
    c.country.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({
    items: results,
    total: results.length,
    page: 1,
    pages: 1,
  });
};