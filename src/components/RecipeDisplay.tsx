import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat, Heart } from "lucide-react";

interface RecipeDisplayProps {
  title: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  servings: number;
  onSaveFavorite?: () => void;
  isFavorite?: boolean;
}

export const RecipeDisplay = ({ title, ingredients, steps, cookTime, servings, onSaveFavorite, isFavorite }: RecipeDisplayProps) => {
  return (
    <Card className="w-full shadow-recipe bg-recipe-background">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ChefHat className="text-primary" size={24} />
            <CardTitle className="text-2xl bg-gradient-warm bg-clip-text text-transparent">
              {title}
            </CardTitle>
          </div>
          {onSaveFavorite && (
            <Button
              variant={isFavorite ? "default" : "outline"}
              size="sm"
              onClick={onSaveFavorite}
              className="ml-2"
            >
              <Heart size={16} className={isFavorite ? "fill-current" : ""} />
            </Button>
          )}
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{servings} servings</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-foreground">Starring Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <Badge key={index} variant="secondary" className="bg-secondary/50">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3 text-foreground">Cooking Adventure</h3>
          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};