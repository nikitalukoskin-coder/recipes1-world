"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiClock, FiEdit2 } from "react-icons/fi";
import { GiCookingPot, GiKnifeFork } from "react-icons/gi"; 
import { api } from "@/lib/api";
import { Recipe, Cuisine } from "@/types";

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
     const router = useRouter();
      const { id } = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [cuisine, setCuisine] = useState<Cuisine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 4. Теперь используйте переменную id
        const data = await api.getRecipe(id);
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Загрузка...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!recipe) return <div className="p-6 text-center">Рецепт не найден</div>;

  return (
    <div className="detail-container">
      <Link href="/recipes" className="btn-back">
        <FiArrowLeft size={18} /> Назад к рецептам
      </Link>

      <div className="detail-card">
        <div className="detail-header">
          <GiCookingPot size={64} />
        </div>

        <div className="detail-content">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="detail-title">{recipe.title}</h1>
              <p className="detail-subtitle flex items-center gap-1">
                <GiKnifeFork /> {cuisine?.name || "Неизвестная кухня"}
              </p>
            </div>
            <Link href={`/recipes/${recipe.id}/edit`} className="btn-edit">
              <FiEdit2 size={16} /> Редактировать
            </Link>
          </div>

          <div className="detail-info">
            <div className="info-row">
              <span className="info-label">Время:</span>
              <span className="info-value"><FiClock className="inline mr-1" /> {recipe.cookingTime} мин</span>
            </div>
            <div className="info-row">
              <span className="info-label">Сложность:</span>
              <span className="info-value">{recipe.difficulty}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Вегетарианское:</span>
              <span className="info-value">{recipe.isVegetarian ? "Да" : "Нет"}</span>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">Ингредиенты</h2>
            <p className="ingredients-text">{recipe.ingredients}</p>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">Описание</h2>
            <p className="ingredients-text">{recipe.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
