
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import RecipeDetail from "@/components/RecipeDetail";
import RecipeCard from "@/components/RecipeCard";
import { mockRecipes } from "@/lib/types";

const RecipePage = () => {
  const { id } = useParams();
  
  // Find the recipe with the matching ID
  const recipe = mockRecipes.find(recipe => recipe.id === id);
  
  // Get related recipes (excluding the current one)
  const relatedRecipes = mockRecipes
    .filter(r => r.id !== id && r.category === recipe?.category)
    .slice(0, 3);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Button className="gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        {/* Back navigation */}
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <Button 
            variant="ghost" 
            className="gap-2 -ml-2" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>
        
        {/* Recipe detail */}
        <RecipeDetail recipe={recipe} />
        
        {/* Related recipes */}
        {relatedRecipes.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold mb-8"
                >
                  Similar Recipes
                </motion.h2>
                
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {relatedRecipes.map((relatedRecipe, index) => (
                    <motion.div key={relatedRecipe.id} variants={itemVariants}>
                      <RecipeCard 
                        id={relatedRecipe.id}
                        title={relatedRecipe.title}
                        image={relatedRecipe.image}
                        category={relatedRecipe.category}
                        prepTime={relatedRecipe.prepTime}
                        difficulty={relatedRecipe.difficulty}
                        index={index}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default RecipePage;
