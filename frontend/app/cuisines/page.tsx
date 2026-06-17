"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";
import { api } from "@/lib/api";
import { Cuisine } from "@/types";

export default function CuisinesPage() {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCuisines = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getCuisines(1, 100);
      setCuisines(data.items);
    } catch (err) {
      setError("Ошибка загрузки кухонь");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCuisines();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Удалить кухню "${name}"? Все рецепты этой кухни также будут удалены.`)) {
      try {
        const res = await api.deleteCuisine(id);
        if (res.ok) {
          await loadCuisines();
          alert("Кухня удалена");
        } else {
          alert("Ошибка удаления");
        }
      } catch (err) {
        console.error(err);
        alert("Ошибка подключения к серверу");
      }
    }
  };

  const getFlag = (country: string) => {
    const flags: Record<string, string> = {
      Италия: "🇮🇹",
      Япония: "🇯🇵",
      Россия: "🇷🇺",
      Франция: "🇫🇷",
      Мексика: "🇲🇽",
    };
    return flags[country] || "🌍";
  };

  if (loading) return <div className="p-6 text-center">Загрузка...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GiKnifeFork className="text-amber-500" /> Кухни мира
        </h1>
        <Link href="/cuisines/new" className="btn btn-success">
          + Добавить кухню
        </Link>
      </div>

      <div className="grid-cards">
        {cuisines.map((c) => (
          <div key={c.id} className="card">
            <div className="card-header">
              <span className="text-5xl">{getFlag(c.country)}</span>
              {c.isPopular && (
                <span className="badge badge-popular">Популярная</span>
              )}
            </div>
            <div className="card-body">
              <h2 className="card-title">{c.name}</h2>
              <p className="card-subtitle">{c.country}</p>
              <p className="card-description">{c.description || "Нет описания"}</p>
            </div>
            <div className="card-actions">
              <Link href={`/cuisines/${c.id}`} className="action-btn view-btn">
                <FiEye size={16} /> Просмотр
              </Link>
              <Link href={`/cuisines/${c.id}/edit`} className="action-btn edit-btn">
                <FiEdit2 size={16} /> Редактировать
              </Link>
              <button onClick={() => handleDelete(c.id, c.name)} className="action-btn delete-btn">
                <FiTrash2 size={16} /> Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}