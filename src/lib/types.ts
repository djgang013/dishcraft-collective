
// Define the structure of a recipe
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  ingredients: {
    name: string;
    amount: string;
    unit: string;
  }[];
  instructions: string[];
  notes?: string[];
  likes: number;
  createdBy: string;
  createdAt: string;
}

// Mock data for recipes
export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    description: "A simple yet delicious Neapolitan pizza topped with tomatoes, mozzarella cheese, fresh basil, and drizzled with olive oil.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Main Course",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { name: "pizza dough", amount: "500", unit: "g" },
      { name: "canned tomatoes", amount: "400", unit: "g" },
      { name: "fresh mozzarella", amount: "250", unit: "g" },
      { name: "fresh basil leaves", amount: "10", unit: "" },
      { name: "extra virgin olive oil", amount: "2", unit: "tbsp" },
      { name: "salt", amount: "1", unit: "tsp" },
    ],
    instructions: [
      "Preheat your oven to the highest temperature (usually around 500°F/260°C).",
      "Roll out the pizza dough on a floured surface to your desired thickness.",
      "Spread the crushed tomatoes evenly over the dough, leaving a small border for the crust.",
      "Tear the mozzarella into pieces and distribute it over the tomato sauce.",
      "Bake in the preheated oven for 10-15 minutes, or until the crust is golden and the cheese is bubbly.",
      "Remove from the oven, top with fresh basil leaves, drizzle with olive oil, and season with salt to taste.",
      "Slice and serve immediately while hot."
    ],
    notes: [
      "For the best results, use a pizza stone if you have one.",
      "Fresh mozzarella works better than the pre-shredded type for authentic flavor."
    ],
    likes: 124,
    createdBy: "Chef Antonio",
    createdAt: "2023-05-10"
  },
  {
    id: "2",
    title: "Avocado Toast with Poached Eggs",
    description: "A trendy and nutritious breakfast featuring creamy avocado spread on toasted bread and topped with perfectly poached eggs.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    category: "Breakfast",
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    difficulty: "medium",
    ingredients: [
      { name: "ripe avocados", amount: "2", unit: "" },
      { name: "sourdough bread", amount: "4", unit: "slices" },
      { name: "eggs", amount: "4", unit: "" },
      { name: "lemon juice", amount: "1", unit: "tbsp" },
      { name: "red pepper flakes", amount: "1/2", unit: "tsp" },
      { name: "vinegar", amount: "1", unit: "tbsp" },
      { name: "salt and pepper", amount: "", unit: "to taste" },
    ],
    instructions: [
      "Bring a pot of water to a gentle simmer for poaching the eggs. Add the vinegar.",
      "Toast the bread slices until golden brown.",
      "In a bowl, mash the avocados with lemon juice, salt, and pepper.",
      "Carefully crack each egg into the simmering water and poach for about 3 minutes for a runny yolk.",
      "Spread the mashed avocado evenly over the toast slices.",
      "Using a slotted spoon, remove the poached eggs and place them on top of the avocado toast.",
      "Sprinkle with red pepper flakes, additional salt, and pepper if desired.",
      "Serve immediately while the toast is still warm and the eggs are hot."
    ],
    likes: 98,
    createdBy: "Sarah K.",
    createdAt: "2023-07-22"
  },
  {
    id: "3",
    title: "Chocolate Lava Cake",
    description: "Decadent individual chocolate cakes with a gooey, molten chocolate center that flows out when cut into.",
    image: "https://images.unsplash.com/photo-1617625802912-cde586faf331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    category: "Dessert",
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { name: "bittersweet chocolate", amount: "200", unit: "g" },
      { name: "unsalted butter", amount: "120", unit: "g" },
      { name: "eggs", amount: "4", unit: "" },
      { name: "egg yolks", amount: "2", unit: "" },
      { name: "granulated sugar", amount: "100", unit: "g" },
      { name: "all-purpose flour", amount: "2", unit: "tbsp" },
      { name: "salt", amount: "1/4", unit: "tsp" },
      { name: "powdered sugar", amount: "", unit: "for dusting" },
    ],
    instructions: [
      "Preheat the oven to 425°F (220°C). Butter and lightly flour four 6-ounce ramekins.",
      "Melt the chocolate and butter together in a double boiler or in the microwave, stirring until smooth.",
      "In a separate bowl, whisk together the eggs, egg yolks, and sugar until light and thick.",
      "Fold the melted chocolate mixture into the egg mixture.",
      "Gently fold in the flour and salt until just combined.",
      "Divide the batter among the prepared ramekins.",
      "Place the ramekins on a baking sheet and bake for 12 minutes, or until the sides are firm but the center is soft.",
      "Let the cakes cool in the ramekins for 1 minute, then carefully invert onto serving plates.",
      "Dust with powdered sugar and serve immediately, while the centers are still molten."
    ],
    notes: [
      "Make sure not to overbake, or you'll lose the molten center.",
      "You can prepare the batter ahead of time and refrigerate until ready to bake."
    ],
    likes: 156,
    createdBy: "Chef Pierre",
    createdAt: "2023-06-14"
  },
  {
    id: "4",
    title: "Fresh Spring Rolls with Peanut Sauce",
    description: "Light and refreshing Vietnamese-inspired rolls filled with vegetables, herbs, and your choice of protein, served with a flavorful peanut dipping sauce.",
    image: "https://images.unsplash.com/photo-1607755061866-b1aae7785a0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    category: "Appetizer",
    prepTime: 30,
    cookTime: 0,
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { name: "rice paper wrappers", amount: "12", unit: "" },
      { name: "rice vermicelli noodles", amount: "100", unit: "g" },
      { name: "carrots, julienned", amount: "1", unit: "cup" },
      { name: "cucumber, julienned", amount: "1", unit: "cup" },
      { name: "bell pepper, julienned", amount: "1", unit: "cup" },
      { name: "fresh mint leaves", amount: "1", unit: "bunch" },
      { name: "fresh cilantro", amount: "1", unit: "bunch" },
      { name: "shrimp, cooked and halved", amount: "12", unit: "" },
      { name: "butter lettuce leaves", amount: "12", unit: "" },
      { name: "smooth peanut butter", amount: "1/4", unit: "cup" },
      { name: "hoisin sauce", amount: "2", unit: "tbsp" },
      { name: "soy sauce", amount: "1", unit: "tbsp" },
      { name: "rice vinegar", amount: "1", unit: "tbsp" },
      { name: "sesame oil", amount: "1", unit: "tsp" },
      { name: "water", amount: "3", unit: "tbsp" },
    ],
    instructions: [
      "Cook the rice vermicelli noodles according to package instructions, then drain and rinse with cold water.",
      "Prepare all the vegetables and herbs, and arrange them on a work surface.",
      "Fill a large bowl with warm water. Dip one rice paper wrapper in the water for about 15-20 seconds until it starts to soften.",
      "Lay the softened wrapper on a clean, damp kitchen towel.",
      "Place a lettuce leaf on the bottom third of the wrapper, then add a small portion of noodles, vegetables, herbs, and 2 shrimp halves.",
      "Fold the bottom of the wrapper over the filling, then fold in the sides and roll tightly to seal.",
      "Repeat with the remaining wrappers and fillings.",
      "For the peanut sauce, whisk together peanut butter, hoisin sauce, soy sauce, rice vinegar, sesame oil, and water until smooth.",
      "Serve the fresh spring rolls with the peanut dipping sauce."
    ],
    notes: [
      "Keep the prepared rolls covered with a damp towel to prevent them from drying out.",
      "The rice paper wrappers can be sticky, so work on a damp surface."
    ],
    likes: 87,
    createdBy: "Mai T.",
    createdAt: "2023-08-05"
  },
  {
    id: "5",
    title: "Greek Quinoa Salad",
    description: "A nutritious Mediterranean-inspired salad featuring protein-rich quinoa, fresh vegetables, feta cheese, and a zesty lemon dressing.",
    image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZWslMjBzYWxhZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "Salad",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { name: "quinoa", amount: "1", unit: "cup" },
      { name: "vegetable broth", amount: "2", unit: "cups" },
      { name: "cucumber, diced", amount: "1", unit: "" },
      { name: "cherry tomatoes, halved", amount: "1", unit: "cup" },
      { name: "red onion, finely diced", amount: "1/2", unit: "" },
      { name: "kalamata olives, pitted", amount: "1/2", unit: "cup" },
      { name: "feta cheese, crumbled", amount: "1/2", unit: "cup" },
      { name: "fresh parsley, chopped", amount: "1/4", unit: "cup" },
      { name: "fresh mint, chopped", amount: "2", unit: "tbsp" },
      { name: "extra virgin olive oil", amount: "1/4", unit: "cup" },
      { name: "lemon juice", amount: "3", unit: "tbsp" },
      { name: "garlic, minced", amount: "1", unit: "clove" },
      { name: "dried oregano", amount: "1", unit: "tsp" },
      { name: "salt and pepper", amount: "", unit: "to taste" },
    ],
    instructions: [
      "Rinse the quinoa under cold water and drain.",
      "In a medium saucepan, bring the vegetable broth to a boil. Add the quinoa, reduce heat to low, cover, and simmer for about 15 minutes, or until the liquid is absorbed.",
      "Remove from heat and let stand, covered, for 5 minutes. Fluff with a fork and allow to cool to room temperature.",
      "In a large bowl, combine the cooled quinoa, cucumber, cherry tomatoes, red onion, olives, feta cheese, parsley, and mint.",
      "In a small bowl, whisk together the olive oil, lemon juice, garlic, oregano, salt, and pepper to make the dressing.",
      "Pour the dressing over the salad and toss gently to combine.",
      "Let the salad sit for at least 30 minutes before serving to allow the flavors to meld.",
      "Serve chilled or at room temperature."
    ],
    likes: 76,
    createdBy: "Elena G.",
    createdAt: "2023-07-30"
  },
  {
    id: "6",
    title: "Beef Stir-Fry with Vegetables",
    description: "A quick and flavorful Asian-inspired dish featuring tender beef strips and colorful vegetables in a savory sauce.",
    image: "https://images.unsplash.com/photo-1625937285793-5d9803377d38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3RpcmZyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "Main Course",
    prepTime: 20,
    cookTime: 10,
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { name: "beef sirloin, thinly sliced", amount: "500", unit: "g" },
      { name: "soy sauce", amount: "3", unit: "tbsp" },
      { name: "cornstarch", amount: "1", unit: "tbsp" },
      { name: "vegetable oil", amount: "2", unit: "tbsp" },
      { name: "garlic, minced", amount: "3", unit: "cloves" },
      { name: "ginger, minced", amount: "1", unit: "tbsp" },
      { name: "broccoli florets", amount: "2", unit: "cups" },
      { name: "bell peppers, sliced", amount: "2", unit: "" },
      { name: "carrots, julienned", amount: "2", unit: "" },
      { name: "snap peas", amount: "1", unit: "cup" },
      { name: "beef broth", amount: "1/2", unit: "cup" },
      { name: "oyster sauce", amount: "2", unit: "tbsp" },
      { name: "sesame oil", amount: "1", unit: "tsp" },
      { name: "brown sugar", amount: "1", unit: "tsp" },
      { name: "green onions, sliced", amount: "3", unit: "" },
      { name: "sesame seeds", amount: "1", unit: "tbsp" },
    ],
    instructions: [
      "In a bowl, toss the beef strips with 1 tablespoon of soy sauce and cornstarch. Let marinate for 15 minutes.",
      "Heat 1 tablespoon of vegetable oil in a large wok or skillet over high heat. Add the beef and stir-fry for 2-3 minutes until browned but still slightly pink inside. Remove from the wok and set aside.",
      "Add the remaining tablespoon of oil to the wok. Add garlic and ginger and stir-fry for 30 seconds until fragrant.",
      "Add the broccoli, bell peppers, carrots, and snap peas. Stir-fry for 3-4 minutes until vegetables are crisp-tender.",
      "In a small bowl, mix together the beef broth, remaining soy sauce, oyster sauce, sesame oil, and brown sugar.",
      "Return the beef to the wok, add the sauce mixture, and stir to combine. Cook for 1-2 minutes until the sauce thickens slightly.",
      "Garnish with sliced green onions and sesame seeds before serving.",
      "Serve hot with steamed rice or noodles."
    ],
    notes: [
      "Freezing the beef for about 20 minutes before slicing makes it easier to cut into thin strips.",
      "You can substitute the beef with chicken, pork, or tofu for variation."
    ],
    likes: 112,
    createdBy: "Chef Lee",
    createdAt: "2023-06-25"
  }
];
