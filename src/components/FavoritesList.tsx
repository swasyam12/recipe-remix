import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { Recipe } from "@/utils/recipeGenerator";
import { RecipeDisplay } from "./RecipeDisplay";

interface FavoritesListProps {
  favorites: Recipe[];
  onRemoveFavorite: (recipeId: string) => void;
}

export const FavoritesList = ({ favorites, onRemoveFavorite }: FavoritesListProps) => {
  if (favorites.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Heart size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Favorite Recipes Yet</h3>
          <p className="text-muted-foreground">Save your favorite recipe remixes to see them here!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="text-red-500" size={24} />
        <h2 className="text-2xl font-bold">Your Favorite Remixes</h2>
      </div>
      {favorites.map((recipe) => (
        <div key={recipe.id} className="relative">
          <RecipeDisplay
            title={recipe.title}
            ingredients={recipe.ingredients}
            steps={recipe.steps}
            cookTime={recipe.cookTime}
            servings={recipe.servings}
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onRemoveFavorite(recipe.id!)}
            className="absolute top-4 right-4"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
};