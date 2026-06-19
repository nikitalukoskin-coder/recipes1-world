"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Cuisine } from "@/types"; 

export default function NewRecipePage() {
  const router = useRouter();
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    cookingTime: 30,
    difficulty: "",
    ingredients: "",
    description: "",
    isVegetarian: false,
    cuisineId: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCuisines = async () => {
      try {
        const data = await api.getCuisines(1, 100);
        setCuisines(data.items || []);
      } catch (err) {
        console.error("Ошибка загрузки кухонь:", err);
        setError("Ошибка загрузки кухонь");
      } finally {
        setLoading(false);
      }
    };
    loadCuisines();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.title || !formData.cuisineId) {
      setError("Заполните название и выберите кухню");
      return;
    }
    
    try {
      const result = await api.createRecipe(formData);
      if (result.error) {
        throw new Error(result.error);
      }
      router.push("/recipes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    }
  };

  if (loading) return <div className="p-6 text-center">Загрузка...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">➕ Новый рецепт</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block font-semibold mb-1">Название *</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-3 py-2"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Кухня *</label>
          <select
            required
            className="w-full border rounded-lg px-3 py-2"
            value={formData.cuisineId}
            onChange={(e) => setFormData({ ...formData, cuisineId: e.target.value })}
          >
            <option value="">Выберите кухню</option>
            {cuisines.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.country})
              </option>
            ))}
          </select>
          {cuisines.length === 0 && (
            <p className="text-sm text-red-500 mt-1">
              Нет доступных кухонь. Сначала создайте кухню.
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Время (мин) *</label>
            <input
              type="number"
              required
              min="1"
              className="w-full border rounded-lg px-3 py-2"
              value={formData.cookingTime}
              onChange={(e) => setFormData({ ...formData, cookingTime: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Сложность *</label>
            <select
              required
              className="w-full border rounded-lg px-3 py-2"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            >
              <option value="">Выберите</option>
              <option value="Лёгкая">Лёгкая</option>
              <option value="Средняя">Средняя</option>
              <option value="Сложная">Сложная</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Ингредиенты *</label>
          <textarea
            required
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
            value={formData.ingredients}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Описание</label>
          <textarea
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isVegetarian}
              onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
            />
            Вегетарианское блюдо
          </label>
        </div>
        
        <button type="submit" className="w-full btn btn-success">
          Сохранить рецепт
        </button>
      </form>
    </div>
  );
}
