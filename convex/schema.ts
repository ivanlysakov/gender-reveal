import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Party details and settings
  party: defineTable({
    title: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    description: v.optional(v.string()),
    revealTime: v.optional(v.string()),
    isRevealed: v.boolean(),
    actualGender: v.optional(v.union(v.literal("boy"), v.literal("girl"))),
    createdAt: v.string(),
  }),

  // RSVP responses
  rsvps: defineTable({
    partyId: v.id("party"),
    name: v.string(),
    email: v.string(),
    attending: v.boolean(),
    message: v.optional(v.string()),
    createdAt: v.string(),
  }).index("by_party", ["partyId"]),

  // Gender guesses/votes
  guesses: defineTable({
    partyId: v.id("party"),
    name: v.string(),
    email: v.optional(v.string()),
    guess: v.union(v.literal("boy"), v.literal("girl")),
    zodiacSign: v.optional(v.union(v.literal("sagittarius"), v.literal("capricorn"))),
    suggestedName: v.optional(v.string()),
    wishes: v.optional(v.string()),
    message: v.optional(v.string()),
    createdAt: v.string(),
  }).index("by_party", ["partyId"]),

  // Photo gallery
  photos: defineTable({
    partyId: v.id("party"),
    url: v.string(),
    caption: v.optional(v.string()),
    category: v.union(
      v.literal("pregnancy"),
      v.literal("ultrasound"),
      v.literal("general")
    ),
    order: v.optional(v.number()),
    createdAt: v.string(),
  }).index("by_party", ["partyId"]),

  // Well wishes and messages
  wishes: defineTable({
    partyId: v.id("party"),
    name: v.string(),
    message: v.string(),
    createdAt: v.string(),
  }).index("by_party", ["partyId"]),
});
