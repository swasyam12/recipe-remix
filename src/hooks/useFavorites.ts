import { useState, useEffect } from 'react';
import { Recipe } from '@/utils/recipeGenerator';

const FAVORITES_KEY = 'recipe-remix-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing favorites:', error);
      }
    }
  }, []);

  const saveFavorite = (recipe: Recipe) => {
    const newFavorites = [...favorites, { ...recipe, id: Date.now().toString() }];
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const removeFavorite = (recipeId: string) => {
    const newFavorites = favorites.filter(recipe => recipe.id !== recipeId);
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const isFavorite = (recipeTitle: string) => {
    return favorites.some(recipe => recipe.title === recipeTitle);
  };

  return {
    favorites,
    saveFavorite,
    removeFavorite,
    isFavorite
  };
};