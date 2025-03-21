
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RecipeCard from "@/components/RecipeCard";
import { mockRecipes } from "@/lib/types";

const Index = () => {
  // Featured recipes (just using the first 3 mock recipes)
  const featuredRecipes = mockRecipes.slice(0, 3);
  
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Recipes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              Featured Recipes
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Discover our handpicked selection of delicious recipes crafted with love and expertise.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredRecipes.map((recipe, index) => (
              <motion.div key={recipe.id} variants={itemVariants}>
                <RecipeCard 
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  category={recipe.category}
                  prepTime={recipe.prepTime}
                  difficulty={recipe.difficulty as "easy" | "medium" | "hard"}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mt-10"
          >
            <motion.div variants={itemVariants}>
              <Button variant="outline" className="rounded-full group" size="lg">
                Explore More Recipes
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              Why Choose SmartRecipe
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Our platform offers the perfect solution for organizing and discovering recipes.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Store & Organize",
                description: "Keep all your favorite recipes in one place, organized by categories, cuisines, or dietary preferences.",
                icon: "📚",
              },
              {
                title: "Discover New Recipes",
                description: "Explore a vast collection of recipes from around the world, or search by ingredients you have on hand.",
                icon: "🔍",
              },
              {
                title: "Share Your Creations",
                description: "Connect with a community of food lovers, share your recipes, and get inspired by others.",
                icon: "🌐",
              },
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-border/50 text-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready to Organize Your Recipes?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Join thousands of food enthusiasts who have transformed their cooking experience with SmartRecipe.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button size="lg" className="rounded-full px-8">
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-semibold mb-1">
                <span className="text-primary-foreground">Smart</span>
                <span>Recipe</span>
              </h2>
              <p className="text-secondary-foreground/70 text-sm">
                © 2023 SmartRecipe. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Home</a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">About</a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Recipes</a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Contact</a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
