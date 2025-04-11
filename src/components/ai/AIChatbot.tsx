
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Bot, User, Brain } from "lucide-react";
import { mockRecipes } from "@/lib/types";
import { motion } from "framer-motion";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  recipeIds?: string[];
};

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Chef assistant. Tell me what you're craving or what ingredients you have, and I'll suggest some recipes.",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      respondToMessage(input);
      setIsLoading(false);
    }, 1500);
  };

  const respondToMessage = (userInput: string) => {
    const lowerCaseInput = userInput.toLowerCase();
    let response: Message;

    // Recipe suggestion logic
    if (
      lowerCaseInput.includes("recipe") || 
      lowerCaseInput.includes("make") || 
      lowerCaseInput.includes("cook") ||
      lowerCaseInput.includes("suggest") ||
      lowerCaseInput.includes("recommendation")
    ) {
      // Find relevant recipes (simplified matching for demo)
      const matchingRecipes = mockRecipes
        .filter(recipe => {
          const ingredients = recipe.ingredients.map(i => i.name.toLowerCase());
          const matchTerms = [...ingredients, recipe.title.toLowerCase(), recipe.category.toLowerCase()];
          return matchTerms.some(term => lowerCaseInput.includes(term));
        })
        .slice(0, 3);
      
      if (matchingRecipes.length > 0) {
        response = {
          id: Date.now().toString(),
          content: `Based on what you're looking for, I'd recommend these recipes:`,
          sender: "bot",
          recipeIds: matchingRecipes.map(r => r.id)
        };
      } else {
        response = {
          id: Date.now().toString(),
          content: "I don't have specific recipes that match what you're looking for. Could you tell me more about what ingredients you have or what type of dish you'd like to make?",
          sender: "bot"
        };
      }
    }
    // Greeting logic
    else if (
      lowerCaseInput.includes("hello") || 
      lowerCaseInput.includes("hi") || 
      lowerCaseInput.includes("hey")
    ) {
      response = {
        id: Date.now().toString(),
        content: "Hello! How can I help with your cooking today? Tell me what ingredients you have or what kind of dish you're craving.",
        sender: "bot"
      };
    }
    // Fallback response
    else {
      response = {
        id: Date.now().toString(),
        content: "I'd be happy to help you find recipes! Please tell me what ingredients you have on hand, or what type of dish you're in the mood for.",
        sender: "bot"
      };
    }

    setMessages(prev => [...prev, response]);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-grow pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={`h-8 w-8 ${message.sender === "user" ? "bg-primary" : "bg-muted"}`}>
                  {message.sender === "user" ? (
                    <User className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <Brain className="h-5 w-5" />
                  )}
                </Avatar>
                <div>
                  <Card className={`px-4 py-3 ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </Card>
                  
                  {message.recipeIds && message.recipeIds.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {message.recipeIds.map(id => {
                        const recipe = mockRecipes.find(r => r.id === id);
                        if (!recipe) return null;
                        
                        return (
                          <Card key={id} className="p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                            <div className="flex gap-2">
                              <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={recipe.image} 
                                  alt={recipe.title} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{recipe.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {recipe.prepTime} min • {recipe.difficulty}
                                </p>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2 pt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about recipes or ingredients..."
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default AIChatbot;
