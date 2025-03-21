
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RecipeRatingProps {
  initialRating?: number;
  totalRatings?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  onRate?: (rating: number) => void;
}

const RecipeRating = ({
  initialRating = 0,
  totalRatings = 0,
  size = "md",
  readonly = false,
  onRate
}: RecipeRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: "h-3.5 w-3.5 gap-1",
    md: "h-5 w-5 gap-1.5",
    lg: "h-6 w-6 gap-2",
  };
  
  const handleClick = (selectedRating: number) => {
    if (readonly) return;
    
    setRating(selectedRating);
    
    if (onRate) {
      onRate(selectedRating);
    }
    
    toast({
      title: "Thanks for rating!",
      description: `You rated this recipe ${selectedRating} stars`,
    });
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-yellow-400 ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            aria-label={`Rate ${star} stars`}
            disabled={readonly}
          >
            <Star
              className={sizeClasses[size]}
              fill={star <= (hoverRating || rating) ? "currentColor" : "none"}
            />
          </button>
        ))}
      </div>
      
      {totalRatings > 0 && (
        <div className="text-xs text-muted-foreground mt-1">
          {typeof rating === 'number' ? rating.toFixed(1) : '0.0'} ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
        </div>
      )}
    </div>
  );
};

export default RecipeRating;
