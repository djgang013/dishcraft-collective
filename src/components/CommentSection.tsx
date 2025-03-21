
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const commentSchema = z.object({
  comment: z.string().min(3, { message: "Comment must be at least 3 characters" }).max(500, { message: "Comment must be less than 500 characters" }),
});

type CommentFormValues = z.infer<typeof commentSchema>;

// Mock comments data - in a real app, this would come from a database
const mockComments = [
  {
    id: 1,
    author: "Emily Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "I made this recipe last night and it was absolutely delicious! My family loved it. I added a bit more garlic than suggested and it worked well.",
    date: "2 days ago",
    likes: 12,
    userLiked: false,
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=8",
    content: "Great recipe! I substituted the cream with coconut milk for a dairy-free version and it still turned out amazing. Will definitely make it again.",
    date: "1 week ago",
    likes: 8,
    userLiked: true,
  },
  {
    id: 3,
    author: "Sophia Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=5",
    content: "The preparation time took longer than stated, but the end result was worth it. The flavors blend perfectly!",
    date: "2 weeks ago",
    likes: 5,
    userLiked: false,
  },
];

interface CommentSectionProps {
  recipeId: number;
}

const CommentSection = ({ recipeId }: CommentSectionProps) => {
  const [comments, setComments] = useState(mockComments);
  
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });
  
  const onSubmit = (data: CommentFormValues) => {
    // In a real app, this would send the comment to an API
    const newComment = {
      id: Date.now(),
      author: "Current User",
      avatar: "https://i.pravatar.cc/150?img=12",
      content: data.comment,
      date: "Just now",
      likes: 0,
      userLiked: false,
    };
    
    setComments([newComment, ...comments]);
    form.reset();
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added to the recipe"
    });
  };
  
  const handleLike = (id: number) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === id) {
          const userLiked = !comment.userLiked;
          return {
            ...comment,
            likes: userLiked ? comment.likes + 1 : comment.likes - 1,
            userLiked
          };
        }
        return comment;
      })
    );
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="@currentuser" />
                      <AvatarFallback>CU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your thoughts or tips about this recipe..."
                        className="resize-none min-h-24"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Post Comment
            </Button>
          </div>
        </form>
      </Form>
      
      <div className="divide-y">
        {comments.map((comment) => (
          <div key={comment.id} className="py-5 space-y-2">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{comment.author}</h4>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                
                <p className="mt-1 text-sm">{comment.content}</p>
                
                <div className="flex items-center gap-4 mt-3">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`gap-1 px-2 text-xs ${comment.userLiked ? 'text-primary' : ''}`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                    {comment.userLiked ? 'Liked' : 'Like'}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="gap-1 px-2 text-xs"
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
