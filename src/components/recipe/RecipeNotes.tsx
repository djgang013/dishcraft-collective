
import { motion } from "framer-motion";
import { Recipe } from "@/lib/types";

interface RecipeNotesProps {
  recipe: Recipe;
}

const RecipeNotes = ({ recipe }: RecipeNotesProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50">
      <h2 className="text-xl font-semibold mb-4">Notes & Tips</h2>
      {recipe.notes && recipe.notes.length > 0 ? (
        <ul className="space-y-4">
          {recipe.notes.map((note, index) => (
            <li key={index} className="p-3 bg-accent/30 rounded-lg">
              <p>{note}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No notes or tips available for this recipe.</p>
      )}
    </div>
  );
};

export default RecipeNotes;
