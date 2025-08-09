import { mutation } from "./_generated/server";

// Script to reveal that it's a boy
export const revealBoy = mutation({
  args: {},
  handler: async (ctx) => {
    const party = await ctx.db.query("party").first();
    
    if (party) {
      // Update existing party record
      return await ctx.db.patch(party._id, {
        actualGender: "boy",
        isRevealed: true,
      });
    } else {
      // Create new party record with boy revealed
      return await ctx.db.insert("party", {
        title: "Gender Reveal Party",
        date: "2025-08-09",
        time: "15:00",
        location: "Virtual Celebration",
        actualGender: "boy",
        isRevealed: true,
        createdAt: new Date().toISOString(),
      });
    }
  },
});