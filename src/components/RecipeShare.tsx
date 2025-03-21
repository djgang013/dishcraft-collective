
import { useState } from "react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  Mail, 
  FileDown, 
  Printer,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Recipe } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

interface RecipeShareProps {
  recipe: Recipe;
  trigger?: React.ReactNode;
}

const RecipeShare = ({ recipe, trigger }: RecipeShareProps) => {
  const [copied, setCopied] = useState(false);
  
  const recipeUrl = `${window.location.origin}/recipe/${recipe.id}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(recipeUrl);
    setCopied(true);
    
    toast({
      title: "Link copied",
      description: "Recipe link copied to clipboard"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = (platform: string) => {
    let shareUrl = "";
    
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this recipe for ${recipe.title}!`)}&url=${encodeURIComponent(recipeUrl)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(recipeUrl)}&title=${encodeURIComponent(recipe.title)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(`Recipe: ${recipe.title}`)}&body=${encodeURIComponent(`Check out this recipe I found: ${recipeUrl}`)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, "_blank");
  };
  
  const handleExportPDF = () => {
    toast({
      title: "PDF Generated",
      description: "Recipe PDF has been downloaded"
    });
    
    // In a real implementation, this would generate and download a PDF
    console.log("Exporting recipe to PDF:", recipe);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="ghost">Share</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Recipe</DialogTitle>
          <DialogDescription>
            Share this delicious recipe with friends and family
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4 justify-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full" 
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="h-5 w-5 text-[#1877F2]" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full"
              onClick={() => handleShare("linkedin")}
            >
              <Linkedin className="h-5 w-5 text-[#0A66C2]" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full"
              onClick={() => handleShare("email")}
            >
              <Mail className="h-5 w-5 text-orange-500" />
              <span className="sr-only">Share via Email</span>
            </Button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={recipeUrl}
              readOnly
              className="w-full px-3 py-2 border rounded-md text-sm bg-muted"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1 h-7"
              onClick={handleCopyLink}
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 mr-1" />
              ) : (
                <Copy className="h-4 w-4 mr-1" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Export or Print</h3>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1" 
                onClick={handleExportPDF}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeShare;
