export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

export const ingredients: Ingredient[] = [
  // Proteins
  { id: "chicken", name: "Chicken", emoji: "🐔", category: "protein" },
  { id: "beef", name: "Beef", emoji: "🥩", category: "protein" },
  { id: "fish", name: "Fish", emoji: "🐟", category: "protein" },
  { id: "eggs", name: "Eggs", emoji: "🥚", category: "protein" },
  { id: "tofu", name: "Tofu", emoji: "🧈", category: "protein" },
  { id: "beans", name: "Beans", emoji: "🫘", category: "protein" },
  
  // Vegetables
  { id: "tomato", name: "Tomato", emoji: "🍅", category: "vegetable" },
  { id: "onion", name: "Onion", emoji: "🧅", category: "vegetable" },
  { id: "bell-pepper", name: "Bell Pepper", emoji: "🫑", category: "vegetable" },
  { id: "mushroom", name: "Mushroom", emoji: "🍄", category: "vegetable" },
  { id: "carrot", name: "Carrot", emoji: "🥕", category: "vegetable" },
  { id: "broccoli", name: "Broccoli", emoji: "🥦", category: "vegetable" },
  { id: "spinach", name: "Spinach", emoji: "🥬", category: "vegetable" },
  { id: "garlic", name: "Garlic", emoji: "🧄", category: "vegetable" },
  
  // Starches
  { id: "rice", name: "Rice", emoji: "🍚", category: "starch" },
  { id: "pasta", name: "Pasta", emoji: "🍝", category: "starch" },
  { id: "potato", name: "Potato", emoji: "🥔", category: "starch" },
  { id: "bread", name: "Bread", emoji: "🍞", category: "starch" },
  { id: "quinoa", name: "Quinoa", emoji: "🌾", category: "starch" },
  
  // Dairy & Others
  { id: "cheese", name: "Cheese", emoji: "🧀", category: "dairy" },
  { id: "milk", name: "Milk", emoji: "🥛", category: "dairy" },
  { id: "lemon", name: "Lemon", emoji: "🍋", category: "fruit" },
  { id: "avocado", name: "Avocado", emoji: "🥑", category: "fruit" },
  { id: "coconut", name: "Coconut", emoji: "🥥", category: "fruit" },
];