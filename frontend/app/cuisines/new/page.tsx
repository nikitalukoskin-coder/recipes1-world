"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function NewCuisinePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    isPopular: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await api.createCuisine(formData);
      if (result.error) {
        throw new Error(result.error);
      }
      router.push("/cuisines");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">➕ Новая кухня</h1>
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
        <button type="submit" disabled={loading} className="w-full btn btn-success disabled:opacity-50">
          {loading ? "Сохранение..." : "Сохранить"}
        </button>
      </form>
    </div>
  );
}