"use client";

import Link from "next/link";
import { GiKnifeFork, GiWorld } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32">
        {/* Декоративные элементы фона */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/20 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            {/* Иконка */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 p-4 shadow-lg transition-transform hover:scale-110">
                <GiWorld className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Заголовок */}
            <h1 className="mb-4 bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl lg:text-7xl">
              Recipes World
            </h1>

            {/* Описание */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-700 sm:text-xl">
              Управляйте кулинарными традициями и рецептами со всего мира.
              Откройте для себя новые вкусы и делитесь своими шедеврами.
            </p>

            {/* Кнопки навигации */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/cuisines"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-xl sm:w-auto"
              >
                <GiKnifeFork className="h-5 w-5 transition-transform group-hover:rotate-12" />
                Кухни мира
                <span className="text-sm opacity-80">→</span>
              </Link>

              <Link
                href="/recipes"
                className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-amber-200 bg-white/70 px-8 py-4 text-lg font-semibold text-amber-800 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:border-amber-400 hover:bg-white hover:shadow-lg sm:w-auto"
              >
                <FaBookOpen className="h-5 w-5 transition-transform group-hover:-rotate-6" />
                Все рецепты
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}