
import { useState } from "react";
import { PlusCircle, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([{ name: "", amount: "", unit: "" }]);
  const [steps, setSteps] = useState([""]);
  
  // Add new ingredient field
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };
  
  // Remove ingredient field
  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };
  
  // Update ingredient field
  const updateIngredient = (index: number, field: string, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setIngredients(updatedIngredients);
  };
  
  // Add new step field
  const addStep = () => {
    setSteps([...steps, ""]);
  };
  
  // Remove step field
  const removeStep = (index: number) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };
  
  // Update step field
  const updateStep = (index: number, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold">Create New Recipe</h2>
      
      <div className="space-y-6">
        {/* Recipe image upload */}
        <div className="space-y-2">
          <Label htmlFor="image" className="text-base">Recipe Image</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
            <div className="flex flex-col items-center justify-center py-6 space-y-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag and drop your image here or click to upload</p>
              <Button variant="secondary" size="sm" className="mt-2">
                Upload Image
              </Button>
            </div>
            <input id="image" type="file" className="hidden" />
          </div>
        </div>
        
        {/* Basic info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">Recipe Title</Label>
            <Input id="title" placeholder="Enter recipe title" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base">Category</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="appetizer">Appetizer</SelectItem>
                <SelectItem value="main">Main Course</SelectItem>
                <SelectItem value="dessert">Dessert</SelectItem>
                <SelectItem value="beverage">Beverage</SelectItem>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prepTime" className="text-base">Preparation Time (minutes)</Label>
            <Input id="prepTime" type="number" min="0" placeholder="Time in minutes" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-base">Difficulty</Label>
            <Select>
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-base">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Briefly describe your recipe" 
            className="min-h-24 resize-y"
          />
        </div>
        
        {/* Ingredients */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Ingredients</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addIngredient}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add</span>
            </Button>
          </div>
          
          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <Input 
                    placeholder="Ingredient name" 
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(index, "name", e.target.value)}
                  />
                </div>
                <div className="w-24">
                  <Input 
                    placeholder="Amount" 
                    value={ingredient.amount}
                    onChange={(e) => updateIngredient(index, "amount", e.target.value)}
                  />
                </div>
                <div className="w-24">
                  <Input 
                    placeholder="Unit" 
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                  />
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeIngredient(index)}
                  disabled={ingredients.length === 1}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Instructions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Instructions</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addStep}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Step</span>
            </Button>
          </div>
          
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="min-w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium mt-2">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <Textarea 
                    placeholder={`Step ${index + 1} instructions...`} 
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    className="min-h-24 resize-y"
                  />
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeStep(index)}
                  disabled={steps.length === 1}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive mt-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Submit buttons */}
        <div className="flex items-center gap-3 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save Recipe</Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
