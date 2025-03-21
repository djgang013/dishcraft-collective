
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/lib/types";

interface RecipeIngredientsProps {
  recipe: Recipe;
}

const RecipeIngredients = ({ recipe }: RecipeIngredientsProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50">
      <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
      <ul className="space-y-2">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-center gap-3 p-2 hover:bg-accent/50 rounded-lg transition-colors">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>
              {ingredient.amount && (
                <span className="font-medium">{ingredient.amount} {ingredient.unit} </span>
              )}
              {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Shopping List</h3>
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5 mr-1" />
            Export List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeIngredients;
