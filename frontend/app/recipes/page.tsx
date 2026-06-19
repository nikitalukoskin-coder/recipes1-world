"use client";

import { useState, useEffect } from "react"; 
import Link from "next/link";
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiClock } from "react-icons/fi";
import { GiCookingPot } from "react-icons/gi";
import { api } from "@/lib/api";
import { Recipe, Cuisine } from "@/types";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [recipesData, cuisinesData] = await Promise.all([
        api.getRecipes(1, 100, selectedCuisine || undefined),
        api.getCuisines(1, 100),
      ]);
      
      setRecipes(recipesData.items || []);
      setCuisines(cuisinesData.items || []);
    } catch (err) {
      setError("Ошибка загрузки данных");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCuisine]);

  const handleSearch = async () => {
    if (!search.trim()) {
      await loadData();
      return;
    }
    
    try {
      setLoading(true);
      const data = await api.searchRecipes(search);
      setRecipes(data.items || []);
    } catch (err) {
      setError("Ошибка поиска");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.trim()) {
        handleSearch();
      } else {
        loadData();
      }
    }, 500);
    
    return () => clearTimeout(debounce);
  }, [search]);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Удалить рецепт "${title}"?`)) {
      try {
        const res = await api.deleteRecipe(id);
        if (res.ok) {
          await loadData();
          alert("Рецепт удалён");
        } else {
          alert("Ошибка удаления");
        }
      } catch (err) {
        console.error(err);
        alert("Ошибка подключения к серверу");
      }
    }
  };

  const getCuisineName = (cuisineId: string) => {
    return cuisines.find((c) => c.id === cuisineId)?.name || "Неизвестно";
  };

  if (loading) return <div className="p-6 text-center">Загрузка...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GiCookingPot className="text-amber-500" /> Рецепты
        </h1>
        <Link href="/recipes/new" className="btn btn-success">
          + Добавить рецепт
        </Link>
      </div>

      <div className="filters-container">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию..."
              className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
          >
            <option value="">Все кухни</option>
            {cuisines.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">Рецептов не найдено</p>
        </div>
      ) : (
        <div className="grid-cards">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="card">
              <div className="card-header">
                <GiCookingPot size={48} />
                {recipe.isVegetarian && (
                  <span className="badge badge-vegetarian">Вегетарианское</span>
                )}
              </div>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p className="card-subtitle">{getCuisineName(recipe.cuisineId)}</p>
                <p className="card-description">
                  {recipe.ingredients.length > 60 
                    ? recipe.ingredients.slice(0, 60) + "..." 
                    : recipe.ingredients}
                </p>
                <div className="card-footer">
                  <span className={`badge-difficulty-${
                    recipe.difficulty === "Лёгкая" ? "easy" : 
                    recipe.difficulty === "Средняя" ? "medium" : "hard"
                  }`}>
                    {recipe.difficulty}
                  </span>
                  <span className="cooking-time">
                    <FiClock className="inline mr-1" /> {recipe.cookingTime} мин
                  </span>
                </div>
              </div>
              <div className="card-actions">
                <Link href={`/recipes/${recipe.id}`} className="action-btn view-btn">
                  <FiEye size={16} /> Просмотр
                </Link>
                <Link href={`/recipes/${recipe.id}/edit`} className="action-btn edit-btn">
                  <FiEdit2 size={16} /> Редактировать
                </Link>
                <button onClick={() => handleDelete(recipe.id, recipe.title)} className="action-btn delete-btn">
                  <FiTrash2 size={16} /> Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
