
import { motion } from "framer-motion";
import { Recipe } from "@/lib/types";
import RecipeHeader from "./recipe/RecipeHeader";
import RecipeContent from "./recipe/RecipeContent";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
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
      <motion.div variants={itemVariants}>
        <RecipeHeader recipe={recipe} />
      </motion.div>
      
      {/* Recipe Content Tabs */}
      <motion.div variants={itemVariants}>
        <RecipeContent recipe={recipe} />
      </motion.div>
    </motion.div>
  );
};

export default RecipeDetail;
