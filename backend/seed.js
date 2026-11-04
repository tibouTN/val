require("dotenv").config();
const mongoose = require("mongoose");
const Memory = require("./models/Memory");

const sampleMemories = [
  {
    title: "That evening",
    caption: "The kind of quiet that still feels loud when I think about it.",
    imageUrl: "/memories/1.jpg",
    order: 1,
  },
  {
    title: "Still smiling",
    caption: "If I had to pick a favorite expression, it would be this one.",
    imageUrl: "/memories/2.jpg",
    order: 2,
  },
  {
    title: "Us, unplanned",
    caption: "No big occasion. Just us, and it was enough.",
    imageUrl: "/memories/3.jpg",
    order: 3,
  },
  {
    title: "Golden hour",
    caption: "I keep this one because the light looked like how I feel around you.",
    imageUrl: "/memories/4.jpg",
    order: 4,
  },
  {
    title: "Hold still",
    caption: "A small moment I never want to lose.",
    imageUrl: "/memories/5.jpg",
    order: 5,
  },
  {
    title: "Soft night",
    caption: "Proof that ordinary days can still feel like a story.",
    imageUrl: "/memories/6.jpg",
    order: 6,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Memory.deleteMany({});
    await Memory.insertMany(sampleMemories);
    console.log(`Seeded ${sampleMemories.length} sample memories`);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
