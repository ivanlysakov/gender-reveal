import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get party details
export const getParty = query({
  args: {},
  handler: async (ctx) => {
    const party = await ctx.db.query("party").first();
    return party;
  },
});

// Create or update party details
export const createOrUpdateParty = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    description: v.optional(v.string()),
    revealTime: v.optional(v.string()),
    isRevealed: v.optional(v.boolean()),
    actualGender: v.optional(v.union(v.literal("boy"), v.literal("girl"))),
  },
  handler: async (ctx, args) => {
    const existingParty = await ctx.db.query("party").first();

    if (existingParty) {
      return await ctx.db.patch(existingParty._id, {
        ...args,
        isRevealed: args.isRevealed ?? existingParty.isRevealed,
      });
    } else {
      return await ctx.db.insert("party", {
        ...args,
        isRevealed: args.isRevealed ?? false,
        createdAt: new Date().toISOString(),
      });
    }
  },
});

// Reveal the gender
export const revealGender = mutation({
  args: {
    actualGender: v.union(v.literal("boy"), v.literal("girl")),
  },
  handler: async (ctx, args) => {
    const party = await ctx.db.query("party").first();
    if (party) {
      return await ctx.db.patch(party._id, {
        actualGender: args.actualGender,
        isRevealed: true,
      });
    }
  },
});
