
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChefHat, Search, Menu, X, Home, BookOpen, LogIn, UserCircle, Settings, LogOut, Brain } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Navigation items
  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/recipes", label: "Recipes", icon: <BookOpen className="h-5 w-5" /> },
    {
      href: "/ai-features",
      label: "AI Features", 
      icon: <Brain className="h-5 w-5" />,
      requiresAuth: true
    },
  ];

  const filteredNavItems = navItems.filter(
    item => !item.requiresAuth || isAuthenticated
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled || showSearch
          ? "bg-background shadow-md"
          : location.pathname === "/"
          ? "bg-transparent"
          : "bg-background shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 mr-6">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">SmartRecipe</span>
          </Link>

          {isDesktop && (
            <nav className="hidden md:flex items-center gap-1">
              {filteredNavItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                >
                  <Link to={item.href}>
                    {item.icon}
                    <span className="ml-1">{item.label}</span>
                  </Link>
                </Button>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showSearch && isDesktop ? (
            <div className="relative w-64">
              <Input
                placeholder="Search recipes..."
                className="pr-8"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowSearch(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(true)}
              className="hidden md:flex"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} 
                      alt={user?.username} 
                    />
                    <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.username}</span>
                    <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/ai-features" className="flex items-center cursor-pointer">
                    <Brain className="mr-2 h-4 w-4" />
                    <span>AI Features</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <span className="font-bold text-lg">SmartRecipe</span>
                </SheetTitle>
              </SheetHeader>

              <div className="py-6 space-y-1">
                {filteredNavItems.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant={location.pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={item.href}>
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  </Button>
                ))}
                
                <div className="pt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search recipes..." className="pl-9" />
                  </div>
                </div>
                
                {isAuthenticated ? (
                  <>
                    <div className="pt-4">
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to="/dashboard">
                          <Home className="h-5 w-5" />
                          <span className="ml-2">Dashboard</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to="/profile">
                          <UserCircle className="h-5 w-5" />
                          <span className="ml-2">Profile</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to="/settings">
                          <Settings className="h-5 w-5" />
                          <span className="ml-2">Settings</span>
                        </Link>
                      </Button>
                    </div>
                    <div className="pt-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="ml-2">Logout</span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="pt-4 grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                      <Link to="/login">
                        <LogIn className="h-5 w-5 mr-2" />
                        Login
                      </Link>
                    </Button>
                    <Button asChild onClick={() => setIsOpen(false)}>
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
