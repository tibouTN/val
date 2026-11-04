import type { Memory } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchMemories(): Promise<Memory[]> {
  const response = await fetch(`${API_URL}/api/memories`);
  if (!response.ok) {
    throw new Error("Could not load memories");
  }
  return response.json();
}
