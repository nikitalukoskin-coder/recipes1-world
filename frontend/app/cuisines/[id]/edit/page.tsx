"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function EditCuisinePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
   const { id } = use(params);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    isPopular: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  
   useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getCuisine(id);
        setFormData({
          name: data.name || "",
          country: data.country || "",
          description: data.description || "",
          isPopular: data.isPopular || false,
        });
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
      await api.updateCuisine(id, formData);
      router.push(`/cuisines/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Загрузка...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href={`/cuisines/${id}`} className="text-blue-500 inline-block mb-4 hover:underline">
        ← Назад к кухне
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">✏️ Редактировать кухню</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block font-semibold mb-1">Название *</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-3 py-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Страна *</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-3 py-2"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
              checked={formData.isPopular}
              onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
            />
            Популярная кухня
          </label>
        </div>
        <button type="submit" disabled={loading} className="w-full btn btn-primary disabled:opacity-50">
          {loading ? "Сохранение..." : "Сохранить изменения"}
        </button>
      </form>
    </div>
  );
}