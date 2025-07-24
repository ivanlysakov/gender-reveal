import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all RSVPs for the party
export const getRSVPs = query({
  args: { partyId: v.id("party") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rsvps")
      .withIndex("by_party", (q) => q.eq("partyId", args.partyId))
      .collect();
  },
});

// Get RSVP statistics
export const getRSVPStats = query({
  args: { partyId: v.id("party") },
  handler: async (ctx, args) => {
    const rsvps = await ctx.db
      .query("rsvps")
      .withIndex("by_party", (q) => q.eq("partyId", args.partyId))
      .collect();

    const attending = rsvps.filter((r) => r.attending).length;
    const notAttending = rsvps.filter((r) => !r.attending).length;
    const total = rsvps.length;

    return {
      attending,
      notAttending,
      total,
      attendingList: rsvps.filter((r) => r.attending),
    };
  },
});

// Submit RSVP
export const submitRSVP = mutation({
  args: {
    partyId: v.id("party"),
    name: v.string(),
    email: v.string(),
    attending: v.boolean(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if this person already RSVPed
    const existingRSVP = await ctx.db
      .query("rsvps")
      .withIndex("by_party", (q) => q.eq("partyId", args.partyId))
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingRSVP) {
      // Update existing RSVP
      return await ctx.db.patch(existingRSVP._id, {
        name: args.name,
        attending: args.attending,
        message: args.message,
      });
    } else {
      // Create new RSVP
      return await ctx.db.insert("rsvps", {
        ...args,
        createdAt: new Date().toISOString(),
      });
    }
  },
});
