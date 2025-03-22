
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { ArrowLeft, ChefHat, Globe, Instagram, Twitter, Facebook } from "lucide-react";

const userTypeColors = {
  chef: "bg-blue-500",
  amateur: "bg-green-500",
  blogger: "bg-purple-500",
};

const userTypeLabels = {
  chef: "Professional Chef",
  amateur: "Food Enthusiast",
  blogger: "Food Blogger",
};

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    website: "",
    instagram: "",
    twitter: "",
    facebook: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    setFormData({
      username: user.username || "",
      email: user.email || "",
      bio: user.bio || "",
      website: user.website || "",
      instagram: user.socialLinks?.instagram || "",
      twitter: user.socialLinks?.twitter || "",
      facebook: user.socialLinks?.facebook || "",
    });
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProfile = {
      username: formData.username,
      bio: formData.bio,
      website: formData.website,
      socialLinks: {
        instagram: formData.instagram,
        twitter: formData.twitter,
        facebook: formData.facebook,
      },
    };
    
    const success = await updateProfile(updatedProfile);
    if (success) {
      setIsEditMode(false);
    }
  };

  const userTypeColor = user.userType ? userTypeColors[user.userType] : "bg-gray-500";
  const userTypeLabel = user.userType ? userTypeLabels[user.userType] : "User";

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
                
                <Badge className={`mt-2 ${userTypeColor} hover:${userTypeColor}`}>
                  {userTypeLabel}
                </Badge>
                
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
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your personal information and profile settings
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
                      disabled={true}  // Email cannot be changed
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself and your cooking style..."
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="min-h-24"
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        name="website"
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={handleChange}
                        disabled={!isEditMode}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Social Media</h3>
                    <div className="space-y-2">
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="instagram"
                          name="instagram"
                          placeholder="Instagram username"
                          value={formData.instagram}
                          onChange={handleChange}
                          disabled={!isEditMode}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="twitter"
                          name="twitter"
                          placeholder="Twitter username"
                          value={formData.twitter}
                          onChange={handleChange}
                          disabled={!isEditMode}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="facebook"
                          name="facebook"
                          placeholder="Facebook username"
                          value={formData.facebook}
                          onChange={handleChange}
                          disabled={!isEditMode}
                          className="pl-10"
                        />
                      </div>
                    </div>
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
