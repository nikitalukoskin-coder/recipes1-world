export interface Cuisine {
  id: string;
  name: string;
  country: string;
  description: string;
  isPopular: boolean;
  createdAt?: string;
}

export interface Recipe {
  id: string;
  title: string;
  cookingTime: number;
  difficulty: string;
  ingredients: string;
  description: string;
  isVegetarian: boolean;
  cuisineId: string;
  createdAt?: string;
}

// Начальные данные
export const cuisines: Cuisine[] = [
  {
    id: "italian",
    name: "Итальянская",
    country: "Италия",
    description: "Паста, пицца, ризотто — кухня солнца и страсти",
    isPopular: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "japanese",
    name: "Японская",
    country: "Япония",
    description: "Суши, сашими, рамен — искусство вкуса и красоты",
    isPopular: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "russian",
    name: "Русская",
    country: "Россия",
    description: "Борщ, пельмени, блины — традиционная домашняя кухня",
    isPopular: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "french",
    name: "Французская",
    country: "Франция",
    description: "Круассаны, сыры, вина — изысканная классика",
    isPopular: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "mexican",
    name: "Мексиканская",
    country: "Мексика",
    description: "Тако, буррито, гуакамоле — острая и яркая кухня",
    isPopular: false,
    createdAt: new Date().toISOString(),
  },
];

export const recipes: Recipe[] = [
  // Итальянская
  {
    id: "pizza",
    title: "Пицца Маргарита",
    cookingTime: 30,
    difficulty: "Лёгкая",
    ingredients: "Тесто, сыр моцарелла, томаты, базилик, оливковое масло",
    description: "Классическая итальянская пицца с томатами, моцареллой и базиликом.",
    isVegetarian: true,
    cuisineId: "italian",
    createdAt: new Date().toISOString(),
  },
  {
    id: "carbonara",
    title: "Паста Карбонара",
    cookingTime: 25,
    difficulty: "Средняя",
    ingredients: "Спагетти, бекон, яйца, пармезан, чёрный перец",
    description: "Традиционная паста из Рима с беконом, яйцами и сыром.",
    isVegetarian: false,
    cuisineId: "italian",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tiramisu",
    title: "Тирамису",
    cookingTime: 60,
    difficulty: "Средняя",
    ingredients: "Маскарпоне, печенье савоярди, кофе, яйца, какао",
    description: "Знаменитый итальянский десерт с кофе и маскарпоне.",
    isVegetarian: true,
    cuisineId: "italian",
    createdAt: new Date().toISOString(),
  },
  // Японская
  {
    id: "sushi",
    title: "Суши Филадельфия",
    cookingTime: 45,
    difficulty: "Сложная",
    ingredients: "Рис, нори, лосось, сливочный сыр, авокадо",
    description: "Роллы с лососем и сливочным сыром.",
    isVegetarian: false,
    cuisineId: "japanese",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ramen",
    title: "Рамен",
    cookingTime: 120,
    difficulty: "Сложная",
    ingredients: "Лапша, свинина, яйцо, нори, зелёный лук, бульон",
    description: "Японский суп с лапшой, мясом и яйцом.",
    isVegetarian: false,
    cuisineId: "japanese",
    createdAt: new Date().toISOString(),
  },
  {
    id: "onigiri",
    title: "Онигири",
    cookingTime: 20,
    difficulty: "Лёгкая",
    ingredients: "Рис, нори, тунец, огурец, сливовый соус",
    description: "Японские рисовые треугольники с начинкой.",
    isVegetarian: false,
    cuisineId: "japanese",
    createdAt: new Date().toISOString(),
  },
  // Русская
  {
    id: "borsch",
    title: "Борщ",
    cookingTime: 90,
    difficulty: "Средняя",
    ingredients: "Свёкла, капуста, картофель, морковь, мясо, сметана",
    description: "Красный свекольный суп, визитная карточка славянской кухни.",
    isVegetarian: false,
    cuisineId: "russian",
    createdAt: new Date().toISOString(),
  },
  {
    id: "pelmeni",
    title: "Пельмени",
    cookingTime: 60,
    difficulty: "Средняя",
    ingredients: "Тесто, фарш свинина-говядина, лук, специи, сметана",
    description: "Традиционные русские вареники с мясом.",
    isVegetarian: false,
    cuisineId: "russian",
    createdAt: new Date().toISOString(),
  },
  {
    id: "blini",
    title: "Блины",
    cookingTime: 30,
    difficulty: "Лёгкая",
    ingredients: "Мука, молоко, яйца, сахар, масло, варенье",
    description: "Тонкие золотистые блинчики на молоке.",
    isVegetarian: true,
    cuisineId: "russian",
    createdAt: new Date().toISOString(),
  },
  // Французская
  {
    id: "croissant",
    title: "Круассан",
    cookingTime: 120,
    difficulty: "Сложная",
    ingredients: "Мука, сливочное масло, дрожжи, молоко, сахар",
    description: "Слоёная французская булочка в форме полумесяца.",
    isVegetarian: true,
    cuisineId: "french",
    createdAt: new Date().toISOString(),
  },
  {
    id: "onion_soup",
    title: "Луковый суп",
    cookingTime: 60,
    difficulty: "Средняя",
    ingredients: "Лук, говяжий бульон, сыр грюйер, багет",
    description: "Классический французский суп из карамелизированного лука.",
    isVegetarian: false,
    cuisineId: "french",
    createdAt: new Date().toISOString(),
  },
  {
    id: "quiche",
    title: "Киш",
    cookingTime: 50,
    difficulty: "Средняя",
    ingredients: "Песочное тесто, яйца, сливки, бекон, сыр",
    description: "Открытый пирог с заливкой из яиц и сливок.",
    isVegetarian: false,
    cuisineId: "french",
    createdAt: new Date().toISOString(),
  },
  // Мексиканская
  {
    id: "taco",
    title: "Тако",
    cookingTime: 35,
    difficulty: "Лёгкая",
    ingredients: "Кукурузные лепёшки, мясо, сальса, сыр, авокадо",
    description: "Мексиканские лепёшки с начинкой из мяса и овощей.",
    isVegetarian: false,
    cuisineId: "mexican",
    createdAt: new Date().toISOString(),
  },
  {
    id: "guacamole",
    title: "Гуакамоле",
    cookingTime: 15,
    difficulty: "Лёгкая",
    ingredients: "Авокадо, лайм, помидор, лук, кинза, соль",
    description: "Мексиканский соус из авокадо.",
    isVegetarian: true,
    cuisineId: "mexican",
    createdAt: new Date().toISOString(),
  },
  {
    id: "burrito",
    title: "Буррито",
    cookingTime: 45,
    difficulty: "Средняя",
    ingredients: "Большая лепёшка, мясо, рис, бобы, сыр, сметана",
    description: "Мексиканское блюдо из большой лепёшки с начинкой.",
    isVegetarian: false,
    cuisineId: "mexican",
    createdAt: new Date().toISOString(),
  },
];