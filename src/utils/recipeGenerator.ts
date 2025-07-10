export interface Recipe {
  id?: string;
  title: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  servings: number;
}

const recipeAdjectives = [
  "Magical", "Crispy", "Creamy", "Spicy", "Golden", "Zesty", "Smoky", "Hearty", 
  "Tender", "Savory", "Fusion", "Rustic", "Gourmet", "Sizzling", "Fresh", "Bold"
];

const recipeNouns = [
  "Symphony", "Delight", "Adventure", "Feast", "Medley", "Surprise", "Fusion", 
  "Explosion", "Paradise", "Harmony", "Celebration", "Journey", "Fiesta", "Rhapsody"
];

const cookingMethods = [
  "Sauté", "Roast", "Grill", "Steam", "Stir-fry", "Braise", "Simmer", "Bake", 
  "Pan-fry", "Toss", "Whisk", "Season", "Marinate", "Caramelize", "Sear"
];

const cookingDescriptors = [
  "until golden and fragrant", "until tender and delicious", "until perfectly caramelized",
  "until aromatic and bubbly", "until crispy on the outside", "until fork-tender",
  "until the flavors meld together", "until lightly browned", "until heated through"
];

export function generateRecipe(selectedIngredients: string[]): Recipe {
  if (selectedIngredients.length === 0) {
    throw new Error("Please select at least one ingredient!");
  }

  // Generate creative title
  const adjective = recipeAdjectives[Math.floor(Math.random() * recipeAdjectives.length)];
  const noun = recipeNouns[Math.floor(Math.random() * recipeNouns.length)];
  const mainIngredient = selectedIngredients[0];
  const title = `${adjective} ${mainIngredient} ${noun}`;

  // Generate cooking steps
  const steps: string[] = [];
  
  // Prep step
  steps.push(`Gather all your ingredients and prepare your workspace. Wash and chop the ${selectedIngredients.slice(0, 3).join(", ")} as needed.`);
  
  // Cooking steps based on ingredients
  if (selectedIngredients.length >= 2) {
    const method1 = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];
    const descriptor1 = cookingDescriptors[Math.floor(Math.random() * cookingDescriptors.length)];
    steps.push(`${method1} the ${selectedIngredients[0]} and ${selectedIngredients[1]} ${descriptor1}.`);
  }
  
  if (selectedIngredients.length >= 3) {
    const method2 = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];
    const descriptor2 = cookingDescriptors[Math.floor(Math.random() * cookingDescriptors.length)];
    steps.push(`Add the ${selectedIngredients.slice(2).join(", ")} and ${method2.toLowerCase()} ${descriptor2}.`);
  }
  
  // Seasoning step
  steps.push("Season generously with salt, pepper, and your favorite herbs or spices to taste.");
  
  // Final step
  steps.push(`Serve immediately while hot and enjoy your delicious ${title.toLowerCase()}!`);

  // Generate cook time and servings
  const cookTimes = ["15 mins", "20 mins", "25 mins", "30 mins", "35 mins"];
  const cookTime = cookTimes[Math.floor(Math.random() * cookTimes.length)];
  const servings = Math.floor(Math.random() * 4) + 2; // 2-5 servings

  return {
    title,
    ingredients: selectedIngredients,
    steps,
    cookTime,
    servings
  };
}