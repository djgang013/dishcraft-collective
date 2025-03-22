
import { RegisterForm } from "@/components/AuthForms";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { ChefHat, PenSquare, Utensils } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-16 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <ChefHat className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Chef</h3>
              <CardDescription>For culinary professionals who want to share expertise and build their brand</CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Utensils className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Food Enthusiast</h3>
              <CardDescription>For home cooks who want to explore recipes and connect with other food lovers</CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <PenSquare className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Food Blogger</h3>
              <CardDescription>For content creators who want to publish and monetize food-related content</CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;
