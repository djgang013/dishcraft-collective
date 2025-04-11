
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Camera, MessageCircle, Utensils } from "lucide-react";
import AIRecipeSuggestions from "@/components/ai/AIRecipeSuggestions";
import AIImageRecognition from "@/components/ai/AIImageRecognition";
import AIChatbot from "@/components/ai/AIChatbot";

const AIFeatures = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("suggestions");
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 py-8 pt-24">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">AI Kitchen Assistant</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-muted-foreground mb-6">
            Explore our AI-powered features to enhance your cooking experience. Get personalized recipe 
            suggestions, identify ingredients from images, and chat with our AI assistant for cooking inspiration.
          </p>

          <Tabs defaultValue="suggestions" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="suggestions" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                <span className="hidden sm:inline">Recipe Suggestions</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Image Recognition</span>
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">AI Chef Chat</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="suggestions">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-primary" />
                    Recipe Suggestions
                  </CardTitle>
                  <CardDescription>
                    Enter ingredients you have on hand, and our AI will suggest delicious recipes you can make
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AIRecipeSuggestions />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="image">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-primary" />
                    Ingredient Recognition
                  </CardTitle>
                  <CardDescription>
                    Upload an image of ingredients, and our AI will identify them and suggest recipes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AIImageRecognition />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chatbot">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    AI Chef Chat
                  </CardTitle>
                  <CardDescription>
                    Chat with our AI chef assistant for personalized recipe recommendations and cooking advice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AIChatbot />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default AIFeatures;
