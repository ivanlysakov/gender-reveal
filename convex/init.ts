import { internalMutation } from "./_generated/server";

// This mutation can be run from the Convex dashboard to initialize the party
export const initializeParty = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if a party already exists
    const existingParty = await ctx.db.query("party").first();
    
    if (!existingParty) {
      // Create initial party with default values
      await ctx.db.insert("party", {
        title: "Boy or Girl?",
        date: "2025-02-14",
        time: "15:00",
        location: "Our Home",
        description: "Join us for the big reveal!",
        isRevealed: false,
        createdAt: new Date().toISOString(),
      });
      
      return "Party initialized successfully";
    }
    
    return "Party already exists";
  },
});