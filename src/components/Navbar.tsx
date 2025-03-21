
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Menu, X, User, LogIn, LogOut, Home, Book, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be handled by a real auth system
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
    { name: "Recipes", path: "/recipes", icon: <Book className="h-4 w-4" /> },
    { name: "Dashboard", path: "/dashboard", icon: <ChefHat className="h-4 w-4" /> },
  ];
  
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">SmartRecipe</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2",
                  location.pathname === link.path && "bg-accent text-accent-foreground"
                )}
                asChild
              >
                <Link to={link.path}>
                  {link.icon}
                  {link.name}
                </Link>
              </Button>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Button variant="outline" className="hidden sm:flex gap-2" asChild>
                  <Link to="/dashboard">
                    <Plus className="h-4 w-4" />
                    New Recipe
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                  <Link to="/login">
                    Log in
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">
                    Sign up
                  </Link>
                </Button>
              </>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-1">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "justify-start gap-2",
                    location.pathname === link.path && "bg-accent text-accent-foreground"
                  )}
                  asChild
                  onClick={toggleMobileMenu}
                >
                  <Link to={link.path}>
                    {link.icon}
                    {link.name}
                  </Link>
                </Button>
              ))}
              
              <div className="pt-2 border-t mt-2">
                {isLoggedIn ? (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start gap-2"
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start gap-2"
                      asChild
                      onClick={toggleMobileMenu}
                    >
                      <Link to="/login">
                        <LogIn className="h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="w-full justify-start gap-2 mt-2"
                      asChild
                      onClick={toggleMobileMenu}
                    >
                      <Link to="/register">
                        <User className="h-4 w-4" />
                        Sign up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
