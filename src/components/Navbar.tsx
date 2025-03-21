
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  PlusCircle, 
  User, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the homepage
  const isHomePage = location.pathname === "/";

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage 
          ? "py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-semibold flex items-center gap-2 transition-transform hover:scale-[1.02]"
        >
          <span className="text-primary">Smart</span>
          <span>Recipe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/recipes" className={`nav-link ${isActive("/recipes") ? "active" : ""}`}>
            Explore
          </Link>
          <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
            My Recipes
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search recipes">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="User profile">
            <User className="h-5 w-5" />
          </Button>
          <Button className="rounded-full gap-1.5" aria-label="Add new recipe">
            <PlusCircle className="h-4 w-4" />
            <span>Recipe</span>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden btn-icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute w-full bg-white dark:bg-gray-900 backdrop-blur-lg transition-all duration-300 shadow-lg overflow-hidden ${
          isMobileMenuOpen ? "max-h-64 border-t border-border/50 py-4" : "max-h-0"
        }`}
      >
        <nav className="container flex flex-col space-y-3 px-4 sm:px-6">
          <Link 
            to="/" 
            className={`nav-link text-lg ${isActive("/") ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/recipes" 
            className={`nav-link text-lg ${isActive("/recipes") ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Explore
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link text-lg ${isActive("/dashboard") ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Recipes
          </Link>

          <div className="flex items-center gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1 gap-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
            <Button size="sm" className="flex-1 gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Recipe</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
