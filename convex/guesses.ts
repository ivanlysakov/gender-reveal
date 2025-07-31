import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all guesses for the party
export const getGuesses = query({
  args: { partyId: v.id("party") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("guesses")
      .withIndex("by_party", (q) => q.eq("partyId", args.partyId))
      .collect();
  },
});

// Get guess statistics
export const getGuessStats = query({
  args: { partyId: v.id("party") },
  handler: async (ctx, args) => {
    const guesses = await ctx.db
      .query("guesses")
      .withIndex("by_party", (q) => q.eq("partyId", args.partyId))
      .collect();

    const boyGuesses = guesses.filter((g) => g.guess === "boy").length;
    const girlGuesses = guesses.filter((g) => g.guess === "girl").length;
    const total = guesses.length;

    return {
      boy: {
        count: boyGuesses,
        percentage: total > 0 ? (boyGuesses / total) * 100 : 0,
      },
      girl: {
        count: girlGuesses,
        percentage: total > 0 ? (girlGuesses / total) * 100 : 0,
      },
      total,
      recentGuesses: guesses.slice(-5).reverse(), // Last 5 guesses
    };
  },
});

// Submit a guess
export const submitGuess = mutation({
  args: {
    partyId: v.id("party"),
    name: v.string(),
    email: v.optional(v.string()),
    guess: v.union(v.literal("boy"), v.literal("girl")),
    zodiacSign: v.optional(v.union(v.literal("sagittarius"), v.literal("capricorn"))),
    suggestedName: v.optional(v.string()),
    wishes: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if this person already guessed
    const existingGuess = await ctx.db
      .query("guesses")
      .withIndex("by_party", (q) => q.eq("partyId", args.partyId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existingGuess) {
      // Update existing guess
      return await ctx.db.patch(existingGuess._id, {
        guess: args.guess,
        zodiacSign: args.zodiacSign,
        suggestedName: args.suggestedName,
        wishes: args.wishes,
        message: args.message,
      });
    } else {
      // Create new guess
      return await ctx.db.insert("guesses", {
        ...args,
        createdAt: new Date().toISOString(),
      });
    }
  },
});
