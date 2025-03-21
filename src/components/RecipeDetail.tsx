
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Users, 
  ChefHat, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Printer, 
  Heart, 
  MessageSquare 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Recipe } from "@/lib/types";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [servings, setServings] = useState(4);

  // Map difficulty to appropriate styling
  const difficultyMap: Record<string, { label: string; color: string }> = {
    easy: { label: "Easy", color: "bg-green-100 text-green-800" },
    medium: { label: "Medium", color: "bg-amber-100 text-amber-800" },
    hard: { label: "Hard", color: "bg-red-100 text-red-800" },
  };

  const toggleSave = () => setIsSaved(!isSaved);
  const toggleLike = () => setIsLiked(!isLiked);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto py-8 px-4 sm:px-6"
    >
      {/* Recipe Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Recipe Image */}
        <div className="md:w-1/2">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Recipe Info */}
        <div className="md:w-1/2 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {recipe.category}
            </div>
            <div className={cn(
              "px-3 py-1 text-xs font-medium rounded-full",
              difficultyMap[recipe.difficulty]?.color || "bg-gray-100"
            )}>
              {difficultyMap[recipe.difficulty]?.label || recipe.difficulty}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{recipe.title}</h1>
          
          <p className="text-muted-foreground mb-6">{recipe.description}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-3 rounded-xl bg-accent/50 flex flex-col items-center justify-center text-center">
              <Clock className="h-5 w-5 mb-1 text-primary" />
              <span className="text-sm font-medium">{recipe.prepTime} min</span>
              <span className="text-xs text-muted-foreground">Prep Time</span>
            </div>
            
            <div className="p-3 rounded-xl bg-accent/50 flex flex-col items-center justify-center text-center">
              <Clock className="h-5 w-5 mb-1 text-primary" />
              <span className="text-sm font-medium">{recipe.cookTime} min</span>
              <span className="text-xs text-muted-foreground">Cook Time</span>
            </div>
            
            <div className="p-3 rounded-xl bg-accent/50 flex flex-col items-center justify-center text-center">
              <Users className="h-5 w-5 mb-1 text-primary" />
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 rounded-full hover:bg-background"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  disabled={servings <= 1}
                >
                  <span className="text-xs font-bold">-</span>
                </Button>
                <span className="text-sm font-medium">{servings}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 rounded-full hover:bg-background"
                  onClick={() => setServings(servings + 1)}
                >
                  <span className="text-xs font-bold">+</span>
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">Servings</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-auto">
            <Button 
              variant="outline" 
              className="flex-1 flex items-center gap-2"
              onClick={toggleSave}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </>
              )}
            </Button>
            
            <Button 
              variant={isLiked ? "default" : "outline"} 
              className="flex items-center gap-2"
              onClick={toggleLike}
            >
              <Heart className={cn("h-4 w-4", isLiked ? "fill-current" : "")} />
              <span>{recipe.likes + (isLiked ? 1 : 0)}</span>
            </Button>
            
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Recipe Content Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="notes">Notes & Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="animate-slide-up">
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
            </div>
          </TabsContent>
          
          <TabsContent value="instructions" className="animate-slide-up">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50">
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
          </TabsContent>
          
          <TabsContent value="notes" className="animate-slide-up">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50">
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
              
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Comments</h3>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <Textarea placeholder="Share your thoughts or tips about this recipe..." className="min-h-24" />
                    <Button className="mt-2">Post Comment</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default RecipeDetail;
