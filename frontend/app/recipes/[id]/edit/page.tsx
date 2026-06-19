"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { api } from "@/lib/api";
import { Cuisine } from "@/types";

export default function EditRecipePage({ params }: { params: Promise<{ id: string }> }) { 
const router = useRouter();
  const { id } = use(params);

  const [formData, setFormData] = useState({
    title: "",
    cookingTime: 30,
    difficulty: "",
    ingredients: "",
    description: "",
    isVegetarian: false,
    cuisineId: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [cuisines, setCuisines] = useState([]);

   useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Загружаем рецепт и список кухонь параллельно
        const [recipeData, cuisinesData] = await Promise.all([
          api.getRecipe(id),
          api.getCuisines()
        ]);
        
        setFormData({
          title: recipeData.title || "",
          cookingTime: recipeData.cookingTime || 30,
          difficulty: recipeData.difficulty || "",
          ingredients: recipeData.ingredients || "",
          description: recipeData.description || "",
          isVegetarian: recipeData.isVegetarian || false,
          cuisineId: recipeData.cuisineId || "",
        });
        setCuisines(cuisinesData.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateRecipe(id, formData);
      router.push(`/recipes/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };


  if (loading) return <div className="p-6 text-center">Загрузка...</div>;
if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href={`/recipes/${id}`} className="text-blue-500 inline-block mb-4 hover:underline">
        ← Назад к рецепту
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">✏️ Редактировать рецепт</h1>
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
            {cuisines.map((cuisine: any) => (
              <option key={cuisine.id} value={cuisine.id}>
                {cuisine.name}
              </option>
            ))}
          </select>
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
        <button type="submit" disabled={loading} className="w-full btn btn-primary disabled:opacity-50">
          {loading ? "Сохранение..." : "Сохранить изменения"}
        </button>
      </form>
    </div>
  );
}
