
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Clock, 
  ChefHat,
  Utensils,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { mockRecipes } from "@/lib/types";

const categoryOptions = [
  "All", "Appetizer", "Main Course", "Dessert", "Beverage", 
  "Breakfast", "Lunch", "Dinner", "Snack"
];

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "nut-free", label: "Nut-Free" },
  { id: "low-carb", label: "Low-Carb" }
];

const Recipes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [maxPrepTime, setMaxPrepTime] = useState(90); // 90 minutes
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string[]>([]);
  
  // Apply filters to recipes
  const filteredRecipes = mockRecipes.filter(recipe => {
    // Search filter
    const matchesSearch = 
      searchQuery === "" || 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = 
      selectedCategory === "All" || 
      recipe.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Time filter
    const matchesTime = recipe.prepTime <= maxPrepTime;
    
    // Difficulty filter
    const matchesDifficulty = 
      difficulty.length === 0 || 
      difficulty.includes(recipe.difficulty);
    
    // Dietary filter (mocked - in real implementation, recipes would have dietary tags)
    const matchesDietary = selectedDietary.length === 0;
    
    return matchesSearch && matchesCategory && matchesTime && matchesDifficulty && matchesDietary;
  });
  
  // Update active filters display
  useEffect(() => {
    const filters = [];
    if (selectedCategory !== "All") filters.push(selectedCategory);
    if (maxPrepTime < 90) filters.push(`Under ${maxPrepTime} min`);
    if (difficulty.length > 0) filters.push(...difficulty);
    if (selectedDietary.length > 0) filters.push(...selectedDietary);
    
    setActiveFilters(filters);
  }, [selectedCategory, maxPrepTime, difficulty, selectedDietary]);
  
  // Handle dietary preferences change
  const handleDietaryChange = (id: string) => {
    setSelectedDietary(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  // Handle difficulty change
  const handleDifficultyChange = (value: string) => {
    setDifficulty(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMaxPrepTime(90);
    setDifficulty([]);
    setSelectedDietary([]);
  };
  
  // Remove a specific filter
  const removeFilter = (filter: string) => {
    if (categoryOptions.includes(filter)) {
      setSelectedCategory("All");
    } else if (filter.includes("min")) {
      setMaxPrepTime(90);
    } else if (["easy", "medium", "hard"].includes(filter)) {
      setDifficulty(prev => prev.filter(d => d !== filter));
    } else {
      setSelectedDietary(prev => prev.filter(d => d !== filter));
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 py-8 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Recipe Catalog</h1>
              <p className="text-muted-foreground">Discover delicious recipes from our community</p>
            </div>
            
            <div className="flex items-center gap-2 self-end md:self-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Recipes</SheetTitle>
                    <SheetDescription>
                      Refine your search with these filters
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Category</h3>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Maximum Preparation Time</h3>
                      <div className="space-y-4">
                        <Slider 
                          defaultValue={[maxPrepTime]} 
                          max={90} 
                          step={5} 
                          onValueChange={(v) => setMaxPrepTime(v[0])} 
                        />
                        <div className="flex justify-between">
                          <span className="text-xs">5 min</span>
                          <span className="text-sm font-medium">{maxPrepTime} minutes</span>
                          <span className="text-xs">90 min</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Difficulty</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {["easy", "medium", "hard"].map((level) => (
                          <div key={level} className="flex items-center gap-2">
                            <Checkbox 
                              id={`difficulty-${level}`} 
                              checked={difficulty.includes(level)}
                              onCheckedChange={() => handleDifficultyChange(level)}
                            />
                            <Label 
                              htmlFor={`difficulty-${level}`}
                              className="capitalize text-sm"
                            >
                              {level}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Dietary Preferences</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {dietaryOptions.map((option) => (
                          <div key={option.id} className="flex items-center gap-2">
                            <Checkbox 
                              id={option.id} 
                              checked={selectedDietary.includes(option.id)}
                              onCheckedChange={() => handleDietaryChange(option.id)}
                            />
                            <Label 
                              htmlFor={option.id}
                              className="text-sm"
                            >
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={clearFilters}>
                        Clear All
                      </Button>
                      <SheetClose asChild>
                        <Button>Apply Filters</Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search recipes by name, ingredients..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge 
                  key={filter} 
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  {filter}
                  <button 
                    onClick={() => removeFilter(filter)}
                    className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
                  >
                    <span className="sr-only">Remove {filter} filter</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
          
          {filteredRecipes.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRecipes.map((recipe, index) => (
                <motion.div 
                  key={recipe.id} 
                  variants={itemVariants}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  <RecipeCard 
                    id={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    category={recipe.category}
                    prepTime={recipe.prepTime}
                    difficulty={recipe.difficulty}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-accent/20 rounded-lg">
              <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No recipes found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any recipes matching your search criteria. Try adjusting your filters or search term.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Recipes;
