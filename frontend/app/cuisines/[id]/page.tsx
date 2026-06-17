"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import { GiKnifeFork, GiCookingPot } from "react-icons/gi";
import { api } from "@/lib/api";
import { Cuisine, Recipe } from "@/types";

export default function CuisinePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  // 3. Разверните Promise с помощью use()
  const { id } = use(params);
  
  const [cuisine, setCuisine] = useState<Cuisine | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 4. Используйте id вместо params.id
        const cuisineData = await api.getCuisine(id);
        if (cuisineData.error) {
          throw new Error(cuisineData.error);
        }
        setCuisine(cuisineData);
        
        const recipesData = await api.getRecipes(1, 100, id);
        setRecipes(recipesData.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const getFlag = (country: string) => {
    const flags: Record<string, string> = {
      Италия: "🇮🇹", Япония: "🇯🇵", Россия: "🇷🇺",
      Франция: "🇫🇷", Мексика: "🇲🇽",
    };
    return flags[country] || "🌍";
  };

  if (loading) return <div className="p-6 text-center">Загрузка...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!cuisine) return <div className="p-6 text-center">Кухня не найдена</div>;

  return (
    <div className="detail-container">
      <Link href="/cuisines" className="btn-back">
        <FiArrowLeft size={18} /> Назад к кухням
      </Link>

      <div className="detail-card">
        <div className="detail-header text-7xl">
          {getFlag(cuisine.country)}
        </div>

        <div className="detail-content">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="detail-title">{cuisine.name}</h1>
              <p className="detail-subtitle flex items-center gap-1">
                <GiKnifeFork /> {cuisine.country}
              </p>
            </div>
            <Link href={`/cuisines/${cuisine.id}/edit`} className="btn-edit">
              <FiEdit2 size={16} /> Редактировать
            </Link>
          </div>

          <div className="detail-info">
            <div className="info-row">
              <span className="info-label">Популярная:</span>
              <span className="info-value">{cuisine.isPopular ? "Да" : "Нет"}</span>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">Описание</h2>
            <p className="ingredients-text">{cuisine.description || "Нет описания"}</p>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">Рецепты этой кухни</h2>
            {recipes.length === 0 ? (
              <p className="text-gray-500">Нет рецептов</p>
            ) : (
              <div className="space-y-2">
                {recipes.map((r) => (
                  <Link key={r.id} href={`/recipes/${r.id}`} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition">
                    <GiCookingPot className="text-amber-500" />
                    <span className="text-gray-700">{r.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}