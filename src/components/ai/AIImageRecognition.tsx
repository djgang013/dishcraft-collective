
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, Image as ImageIcon } from "lucide-react";
import { mockRecipes } from "@/lib/types";
import RecipeCard from "@/components/RecipeCard";

const AIImageRecognition = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognizedIngredients, setRecognizedIngredients] = useState<string[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<typeof mockRecipes>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Mock ingredients recognition
      const mockIngredients = [
        "tomatoes", 
        "onions", 
        "garlic", 
        "bell peppers", 
        "chicken"
      ];
      
      setRecognizedIngredients(mockIngredients);
      
      // Filter recipes based on recognized ingredients
      const results = mockRecipes.filter(recipe => 
        mockIngredients.some(ingredient => 
          recipe.ingredients.some(ri => 
            ri.name.toLowerCase().includes(ingredient.toLowerCase())
          )
        )
      ).slice(0, 3);
      
      setSuggestedRecipes(results);
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearImage = () => {
    setImage(null);
    setRecognizedIngredients([]);
    setSuggestedRecipes([]);
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <Card className="border-dashed border-2 py-12 flex flex-col items-center justify-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Upload an image of ingredients, and our AI will identify them and suggest recipes you can make
          </p>
          <Button 
            onClick={() => document.getElementById('image-upload')?.click()}
            className="gap-2 cursor-pointer"
          >
            <Upload className="h-4 w-4" />
            Upload Image
          </Button>
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="hidden"
          />
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute top-2 right-2">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={clearImage}
                className="opacity-75 hover:opacity-100"
              >
                Try another image
              </Button>
            </div>
            <img 
              src={image} 
              alt="Uploaded ingredients" 
              className="w-full rounded-md object-cover max-h-96"
            />
          </div>
          
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
              <p className="text-muted-foreground text-center">
                Analyzing your image to identify ingredients...
              </p>
            </div>
          ) : (
            <>
              {recognizedIngredients.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recognized Ingredients:</h3>
                  <div className="flex flex-wrap gap-2">
                    {recognizedIngredients.map((ingredient, index) => (
                      <Badge key={index} className="capitalize">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {suggestedRecipes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Suggested Recipes:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AIImageRecognition;
