
import { motion } from "framer-motion";
import { Recipe } from "@/lib/types";

interface RecipeInstructionsProps {
  recipe: Recipe;
}

const RecipeInstructions = ({ recipe }: RecipeInstructionsProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50">
      <h2 className="text-xl font-semibold mb-4">Instructions</h2>
      <ol className="space-y-6">
        {recipe.instructions.map((step, index) => (
          <li key={index} className="flex items-start gap-4">
            <div className="min-w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
              {index + 1}
            </div>
            <div className="flex-1 pt-1">
              <p>{step}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeInstructions;
