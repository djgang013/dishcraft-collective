
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

type UserType = "chef" | "amateur" | "blogger";

interface User {
  id: string;
  username: string;
  email: string;
  userType?: UserType;
  bio?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, userType?: UserType) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
  bookmarks: string[];
  toggleBookmark: (recipeId: string) => void;
  isBookmarked: (recipeId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const navigate = useNavigate();

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedBookmarks = localStorage.getItem("bookmarks");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (bookmarks.length > 0) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would connect to an API
    // For demo purposes, we'll just simulate a successful login
    try {
      // Simple validation to mimic authentication
      if (email && password.length >= 6) {
        // Retrieve stored user if available
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = storedUsers.find((u: User) => u.email === email);
        
        const newUser = foundUser || {
          id: Math.random().toString(36).substr(2, 9),
          username: email.split("@")[0],
          email,
          userType: "amateur",
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(newUser));
        
        toast({
          title: "Login successful",
          description: "Welcome back to SmartRecipe!"
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (
    username: string, 
    email: string, 
    password: string, 
    userType: UserType = "amateur"
  ): Promise<boolean> => {
    // In a real app, this would connect to an API
    try {
      // Simple validation to mimic registration
      if (username && email && password.length >= 6) {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          username,
          email,
          userType,
          bio: "",
          website: "",
          socialLinks: {
            instagram: "",
            twitter: "",
            facebook: "",
          }
        };
        
        // Store in users array
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(newUser));
        
        toast({
          title: "Registration successful",
          description: `Your SmartRecipe account has been created as a ${userType}!`
        });
        
        return true;
      } else {
        toast({
          title: "Registration failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) {
        throw new Error("User not logged in");
      }
      
      const updatedUser = { ...user, ...profileData };
      
      // Update in users array
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = storedUsers.map((u: User) => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Update current user
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/");
  };

  const toggleBookmark = (recipeId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark recipes",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setBookmarks(prev => {
      if (prev.includes(recipeId)) {
        return prev.filter(id => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  const isBookmarked = (recipeId: string) => {
    return bookmarks.includes(recipeId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        bookmarks,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
