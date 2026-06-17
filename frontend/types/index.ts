export interface Cuisine {
  id: string;
  name: string;
  country: string;
  description?: string;
  isPopular: boolean;
  createdAt?: string;
}

export interface Recipe {
  id: string;
  title: string;
  cookingTime: number;
  difficulty: string;
  ingredients: string;
  description?: string;
  isVegetarian: boolean;
  cuisineId: string;
  createdAt?: string;
}