
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  Search, 
  ListFilter, 
  Clock, 
  ChefHat,
  LayoutGrid,
  List
} from "lucide-react";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import RecipeForm from "@/components/RecipeForm";
import { mockRecipes } from "@/lib/types";

const Dashboard = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter recipes based on search query
  const filteredRecipes = mockRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 py-8 pt-24">
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold">My Recipes</h1>
              <p className="text-muted-foreground">Manage and organize your collection</p>
            </div>
            
            <Button 
              className="gap-2"
              onClick={() => setIsCreating(true)}
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Recipe</span>
            </Button>
          </motion.div>
          
          {isCreating ? (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50">
              <RecipeForm />
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <TabsList>
                    <TabsTrigger value="all">All Recipes</TabsTrigger>
                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search recipes..." 
                        className="pl-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Button variant="outline" size="icon" className="hidden sm:flex">
                      <ListFilter className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex rounded-md overflow-hidden border border-border">
                      <Button 
                        variant={viewMode === "grid" ? "secondary" : "ghost"} 
                        size="icon"
                        className="h-10 w-10 rounded-none"
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={viewMode === "list" ? "secondary" : "ghost"} 
                        size="icon"
                        className="h-10 w-10 rounded-none"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <TabsContent value="all" className="mt-0">
                  {filteredRecipes.length > 0 ? (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                      className={
                        viewMode === "grid" 
                          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                          : "space-y-4"
                      }
                    >
                      {filteredRecipes.map((recipe, index) => (
                        <motion.div key={recipe.id} variants={itemVariants}>
                          {viewMode === "grid" ? (
                            <RecipeCard 
                              id={recipe.id}
                              title={recipe.title}
                              image={recipe.image}
                              category={recipe.category}
                              prepTime={recipe.prepTime}
                              difficulty={recipe.difficulty}
                              index={index}
                            />
                          ) : (
                            <div className="flex bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                              <div className="w-32 h-32 shrink-0">
                                <img 
                                  src={recipe.image} 
                                  alt={recipe.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 p-4 flex flex-col">
                                <h3 className="font-semibold text-lg">{recipe.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                                <div className="mt-auto flex items-center justify-between pt-2">
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                      <span className="text-sm text-muted-foreground">{recipe.prepTime} min</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <ChefHat className="h-3.5 w-3.5 text-muted-foreground" />
                                      <span className="text-sm text-muted-foreground capitalize">{recipe.difficulty}</span>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm">View</Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium mb-2">No recipes found</h3>
                      <p className="text-muted-foreground mb-6">Try adjusting your search or create a new recipe.</p>
                      <Button 
                        onClick={() => setIsCreating(true)}
                        className="gap-2"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>Create New Recipe</span>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="favorites" className="mt-0">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No favorite recipes yet</h3>
                    <p className="text-muted-foreground mb-6">Save your favorite recipes for quick access.</p>
                    <Button variant="outline">Browse Recipes</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="recent" className="mt-0">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No recent recipes</h3>
                    <p className="text-muted-foreground mb-6">Your recently viewed recipes will appear here.</p>
                    <Button variant="outline">Browse Recipes</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
