
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recipe } from "@/lib/types";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";
import RecipeNotes from "./RecipeNotes";
import CommentSection from "../CommentSection";

interface RecipeContentProps {
  recipe: Recipe;
}

const RecipeContent = ({ recipe }: RecipeContentProps) => {
  return (
    <Tabs defaultValue="ingredients" className="w-full">
      <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-3 sm:grid-cols-4 mb-8">
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        <TabsTrigger value="instructions">Instructions</TabsTrigger>
        <TabsTrigger value="notes">Notes & Tips</TabsTrigger>
        <TabsTrigger value="comments" className="hidden sm:block">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>Comments</span>
          </div>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="ingredients" className="animate-slide-up">
        <RecipeIngredients recipe={recipe} />
      </TabsContent>
      
      <TabsContent value="instructions" className="animate-slide-up">
        <RecipeInstructions recipe={recipe} />
      </TabsContent>
      
      <TabsContent value="notes" className="animate-slide-up">
        <RecipeNotes recipe={recipe} />
      </TabsContent>
      
      <TabsContent value="comments" className="animate-slide-up">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50">
          <CommentSection recipeId={recipe.id} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RecipeContent;
