
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { ArrowLeft, ChefHat } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    setFormData({
      username: user.username || "",
      email: user.email || "",
    });
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an API request to update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditMode(false);
  };

  return (
    <div className="container max-w-4xl mx-auto pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">My Profile</h1>
          </div>
          <Button
            variant={isEditMode ? "outline" : "default"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                  <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                
                <div className="flex gap-2 mt-4 w-full">
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/dashboard">
                      <ChefHat className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/settings">
                      Settings
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your personal information and account settings
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                </CardContent>
                {isEditMode && (
                  <CardFooter className="flex justify-end gap-2">
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                )}
              </form>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
