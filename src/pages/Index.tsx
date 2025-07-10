import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IngredientCard } from "@/components/IngredientCard";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { FavoritesList } from "@/components/FavoritesList";
import { ingredients } from "@/data/ingredients";
import { generateRecipe, Recipe } from "@/utils/recipeGenerator";
import { useFavorites } from "@/hooks/useFavorites";
import { ChefHat, Sparkles, RefreshCw, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-ingredients.jpg";

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { favorites, saveFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleIngredient = (ingredientName: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientName)
        ? prev.filter(name => name !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const handleGenerateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: "Oops! 🤔",
        description: "Please select at least one ingredient to create your recipe remix!",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      try {
        const recipe = generateRecipe(selectedIngredients);
        setCurrentRecipe(recipe);
        toast({
          title: "Recipe Created! 🎉",
          description: `Your ${recipe.title} is ready to cook!`,
        });
      } catch (error) {
        toast({
          title: "Recipe Error",
          description: "Something went wrong while creating your recipe. Try again!",
          variant: "destructive"
        });
      } finally {
        setIsGenerating(false);
      }
    }, 1000);
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
    setCurrentRecipe(null);
  };

  const handleSaveFavorite = () => {
    if (currentRecipe) {
      if (isFavorite(currentRecipe.title)) {
        const favoriteToRemove = favorites.find(fav => fav.title === currentRecipe.title);
        if (favoriteToRemove?.id) {
          removeFavorite(favoriteToRemove.id);
          toast({
            title: "Removed from favorites",
            description: "Recipe removed from your favorites!",
          });
        }
      } else {
        saveFavorite(currentRecipe);
        toast({
          title: "Added to favorites! ❤️",
          description: "Recipe saved to your favorites!",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative bg-gradient-hero/90 text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ChefHat size={48} />
              <h1 className="text-5xl font-bold">Recipe Remix</h1>
              <Sparkles size={48} />
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Pick your ingredients and let's create something deliciously unexpected together!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="create">Create Recipe</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart size={16} />
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="grid lg:grid-cols-2 gap-8">
          {/* Ingredient Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Choose Your Ingredients</span>
                  {selectedIngredients.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearSelection}
                      className="ml-auto"
                    >
                      <RefreshCw size={16} />
                      Clear All
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ingredients.map((ingredient) => (
                    <IngredientCard
                      key={ingredient.id}
                      name={ingredient.name}
                      emoji={ingredient.emoji}
                      image={ingredient.image}
                      selected={selectedIngredients.includes(ingredient.name)}
                      onToggle={() => toggleIngredient(ingredient.name)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              variant="generate"
              size="lg"
              onClick={handleGenerateRecipe}
              disabled={isGenerating}
              className="w-full h-14 text-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Creating Your Recipe...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Recipe Remix
                  <ChefHat size={20} />
                </>
              )}
            </Button>
          </div>

              {/* Recipe Display */}
              <div>
                {currentRecipe ? (
                  <RecipeDisplay
                    title={currentRecipe.title}
                    ingredients={currentRecipe.ingredients}
                    steps={currentRecipe.steps}
                    cookTime={currentRecipe.cookTime}
                    servings={currentRecipe.servings}
                    onSaveFavorite={handleSaveFavorite}
                    isFavorite={isFavorite(currentRecipe.title)}
                  />
                ) : (
                  <Card className="h-full flex items-center justify-center min-h-[400px]">
                    <CardContent className="text-center text-muted-foreground">
                      <ChefHat size={64} className="mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">Ready to Cook?</h3>
                      <p>Select some ingredients and generate your unique recipe remix!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesList
              favorites={favorites}
              onRemoveFavorite={removeFavorite}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
