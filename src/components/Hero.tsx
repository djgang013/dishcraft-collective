
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgb(239,246,255)_0%,rgb(219,234,254)_90%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgb(30,41,59)_0%,rgb(15,23,42)_90%)] opacity-70 z-0"></div>

      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-6"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-block mb-3"
              >
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Discover & Create
                </span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
              >
                Organize Your <span className="text-primary">Recipes</span> With Elegance
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg text-muted-foreground max-w-md"
              >
                Store, organize, and share your culinary creations with a beautifully designed, 
                intuitive recipe management system.
              </motion.p>
            </div>

            {/* Search bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative max-w-md w-full mt-4"
            >
              <div className="flex">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Search for recipes..." 
                    className="pl-10 pr-4 py-6 rounded-l-full w-full focus-visible:ring-primary" 
                  />
                </div>
                <Button className="rounded-r-full py-6 px-6">
                  Search
                </Button>
              </div>
            </motion.div>

            {/* Features list */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-2 gap-4 mt-6"
            >
              {[
                "Store unlimited recipes",
                "Organize by categories",
                "Share with friends",
                "Generate shopping lists"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="pt-4"
            >
              <Button 
                className="group rounded-full px-6 text-base h-12"
                size="lg"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square relative rounded-3xl overflow-hidden glass border border-white/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/30"></div>
              <img 
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Delicious recipes organized beautifully"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Floating card decoration */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-10 -left-10 w-56 glass rounded-xl p-3 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-primary/80"></div>
                </div>
                <div>
                  <h3 className="font-medium">Recipe Organization</h3>
                  <p className="text-sm text-muted-foreground">All your recipes in one place</p>
                </div>
              </div>
            </motion.div>
            
            {/* Floating card decoration */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -top-5 -right-5 w-48 glass rounded-xl p-3 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full bg-primary/80"></div>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Smart Search</h3>
                  <p className="text-xs text-muted-foreground">Find any recipe instantly</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
