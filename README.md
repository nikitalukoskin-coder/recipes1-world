Recipes World

Recipes World — Кулинарный проект

Автор: Лукошкин Никита Владиславович

Группа: ИСП-9.19

Практика

Краткое описание проекта
Recipes World — это клиент-серверное веб-приложение для управления кулинарными рецептами и кухнями мира. Платформа позволяет пользователям создавать, редактировать и систематизировать рецепты по кухням разных стран, отмечать популярные кухни и вегетарианские блюда.

Предметная область: Рецепты и кухни мира .

Выбор архитектуры (Вариант А)

В проекте выбран Вариант А — раздельные фронтенд и бэкенд.

Обоснование выбора:

Гибкость разработки.

Близость к реальной разработке.

Чёткое разделение ответственности.

Технологический стек
Фронтенд

Next.js 16 

TypeScript 

Tailwind CSS 

React Icons 

Бэкенд

Node.js 18+ 

Express.js 

TypeScript 

CORS 

Хранилище данных

In-memory — данные хранятся в массивах в памяти процесса

Инициализация — при старте сервера заполняется тестовыми данными (5 кухонь, 15 рецептов)

Установка и запуск

Требования

Node.js 18+

npm

Клонирование репозитория

git clone https://github.com/nikitalukoskin-coder/recipes1-world.git
cd recipes-world

Запуск бэкенда

cd backend

npm install

npm run dev

Сервер запустится на http://localhost:4000

Запуск фронтенда

cd frontend

npm install

npm run dev

Приложение запустится на http://localhost:3000

API Эндпоинты

Кухни (Cuisines)
Метод	Путь	Назначение
GET	/api/cuisines	Получить список всех кухонь (с пагинацией)
GET	/api/cuisines/:id	Получить одну кухню по ID
POST	/api/cuisines	Создать новую кухню
PUT	/api/cuisines/:id	Обновить кухню
DELETE	/api/cuisines/:id	Удалить кухню (и все её рецепты)
GET	/api/cuisines/search	Поиск кухонь по названию или стране

GET /api/cuisines – Получить список кухонь
Параметры: ?page=1&limit=10

Ответ:
{
  "items": [
    {
      "id": "italian",
      "name": "Итальянская",
      "country": "Италия",
      "description": "Паста, пицца, ризотто — кухня солнца и страсти",
      "isPopular": true,
      "createdAt": "2026-06-10T..."
    }
  ],
  "total": 5,
  "page": 1,
  "pages": 1
}

GET /api/cuisines/:id – Получить одну кухню
Ответ:
{
  "id": "italian",
  "name": "Итальянская",
  "country": "Италия",
  "description": "Паста, пицца, ризотто — кухня солнца и страсти",
  "isPopular": true,
  "createdAt": "2026-06-10T..."
}

Ошибка 404:
{ "error": "Кухня не найдена" }

POST /api/cuisines – Создать кухню
Тело запроса:
{
  "name": "Греческая",
  "country": "Греция",
  "description": "Оливки, фета, морепродукты",
  "isPopular": false
}
Ответ:
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Греческая",
  "country": "Греция",
  "description": "Оливки, фета, морепродукты",
  "isPopular": false,
  "createdAt": "2026-06-10T..."
}

Ошибка 422 (валидация):
{
  "error": "Ошибка валидации",
  "details": [
    { "field": "name", "message": "Название минимум 2 символа" },
    { "field": "country", "message": "Страна минимум 2 символа" }
  ]
}   

PUT /api/cuisines/:id – Обновить кухню
Тело запроса:
{
  "name": "Греческая кухня",
  "country": "Греция",
  "description": "Средиземноморская кухня",
  "isPopular": true
}

DELETE /api/cuisines/:id – Удалить кухню
Ответ: 204 No Content (удаляет также все рецепты этой кухни)

Рецепты (Recipes)
Метод	Путь	Назначение
GET	/api/recipes	Получить список рецептов (с пагинацией и фильтрацией по кухне)
GET	/api/recipes/:id	Получить один рецепт по ID
POST	/api/recipes	Создать новый рецепт
PUT	/api/recipes/:id	Обновить рецепт
DELETE	/api/recipes/:id	Удалить рецепт
GET	/api/recipes/search	Поиск рецептов по названию

GET /api/recipes – Получить список рецептов
Параметры: ?page=1&limit=10&cuisineId=italian

Ответ:
{
  "items": [
    {
      "id": "pizza",
      "title": "Пицца Маргарита",
      "cookingTime": 30,
      "difficulty": "Лёгкая",
      "ingredients": "Тесто, сыр моцарелла, томаты, базилик, оливковое масло",
      "description": "Классическая итальянская пицца...",
      "isVegetarian": true,
      "cuisineId": "italian",
      "createdAt": "2026-06-10T..."
    }
  ],
  "total": 3,
  "page": 1,
  "pages": 1
}  

GET /api/recipes/:id – Получить один рецепт
Ответ:

{
  "id": "pizza",
  "title": "Пицца Маргарита",
  "cookingTime": 30,
  "difficulty": "Лёгкая",
  "ingredients": "Тесто, сыр моцарелла, томаты, базилик, оливковое масло",
  "description": "Классическая итальянская пицца...",
  "isVegetarian": true,
  "cuisineId": "italian",
  "createdAt": "2026-06-10T..."
}

POST /api/recipes – Создать рецепт
Тело запроса:
{
  "title": "Греческий салат",
  "cookingTime": 15,
  "difficulty": "Лёгкая",
  "ingredients": "Огурцы, помидоры, фета, оливки, лук, оливковое масло",
  "description": "Классический греческий салат с фетой",
  "isVegetarian": true,
  "cuisineId": "greek"
}

Ошибка 422 (кухня не найдена):
{ "error": "Кухня не найдена" }

Структура данных
Сущность «Кухня» (Cuisine)
Поле	Тип	Обязательное	Описание
id	string (UUID)	Да	Уникальный идентификатор
name	string	Да	Название кухни
country	string	Да	Страна происхождения
description	string	Нет	Описание кухни
isPopular	boolean	Да (default: false)	Популярная ли кухня
createdAt	string (ISO date)	Нет	Дата создания
Сущность «Рецепт» (Recipe)
Поле	Тип	Обязательное	Описание
id	string (UUID)	Да	Уникальный идентификатор
title	string	Да	Название рецепта
cookingTime	number	Да	Время приготовления (в минутах)
difficulty	string	Да	Сложность (Лёгкая/Средняя/Сложная)
ingredients	string	Да	Список ингредиентов
description	string	Нет	Описание рецепта
isVegetarian	boolean	Да (default: false)	Вегетарианское ли блюдо
cuisineId	string	Да	ID кухни (внешний ключ)
createdAt	string (ISO date)	Нет	Дата создания

Связи
Кухня → Рецепт: один ко многим (одна кухня может содержать много рецептов)

Рецепт → Кухня: многие к одному (каждый рецепт принадлежит одной кухне)

