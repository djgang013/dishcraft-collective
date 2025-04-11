
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Loader2, Search } from "lucide-react";
import { mockRecipes } from "@/lib/types";
import RecipeCard from "@/components/RecipeCard";

const AIRecipeSuggestions = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedRecipes, setSuggestedRecipes] = useState<typeof mockRecipes>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleSubmit = async () => {
    if (ingredients.length === 0) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // For demo purposes, we'll filter the mock recipes based on ingredients
      const results = mockRecipes.filter(recipe => 
        ingredients.some(ingredient => 
          recipe.ingredients.some(ri => 
            ri.name.toLowerCase().includes(ingredient.toLowerCase())
          )
        )
      ).slice(0, 6);
      
      setSuggestedRecipes(results);
      setIsLoading(false);
    }, 1500);
  };

  const clearAll = () => {
    setIngredients([]);
    setSuggestedRecipes([]);
    setHasSearched(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Add ingredients you have..."
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9"
            />
          </div>
          <Button onClick={addIngredient} disabled={!currentIngredient.trim()}>
            Add
          </Button>
        </div>

        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {ingredient}
                <button 
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {ingredient}</span>
                </button>
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7"
              onClick={clearAll}
            >
              Clear all
            </Button>
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={ingredients.length === 0 || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Find Recipes
              </>
            )}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
          <p className="text-muted-foreground text-center">
            Our AI is analyzing your ingredients and finding the perfect recipes...
          </p>
        </div>
      ) : (
        <>
          {hasSearched && (
            <div>
              {suggestedRecipes.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    We found {suggestedRecipes.length} recipes you can make
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestedRecipes.map((recipe, index) => (
                      <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        image={recipe.image}
                        category={recipe.category}
                        prepTime={recipe.prepTime}
                        difficulty={recipe.difficulty}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No recipes found with these ingredients. Try adding different ingredients.
                  </p>
                  <Button onClick={clearAll}>Try Again</Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AIRecipeSuggestions;
