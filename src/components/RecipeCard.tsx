
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Bookmark, BookmarkCheck, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  prepTime: number;
  difficulty: "easy" | "medium" | "hard";
  index?: number;
}

const RecipeCard = ({ 
  id, 
  title, 
  image, 
  category, 
  prepTime, 
  difficulty,
  index = 0 
}: RecipeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isBookmarked, toggleBookmark } = useAuth();
  const isSaved = isBookmarked(id);

  // Map difficulty to appropriate styling
  const difficultyMap = {
    easy: { label: "Easy", color: "bg-green-100 text-green-800" },
    medium: { label: "Medium", color: "bg-amber-100 text-amber-800" },
    hard: { label: "Hard", color: "bg-red-100 text-red-800" },
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="recipe-card h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/recipe/${id}`} className="flex flex-col h-full">
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className={cn(
              "w-full h-full object-cover transform transition-all duration-700", 
              isHovered ? "scale-110" : "scale-100"
            )}
          />
          
          {/* Save button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white shadow-sm z-10"
            onClick={handleBookmark}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
          
          {/* Category pill */}
          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-white/80 rounded-md shadow-sm">
            {category}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{prepTime} min</span>
            </div>
            
            <div className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              difficultyMap[difficulty].color
            )}>
              <span>{difficultyMap[difficulty].label}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
