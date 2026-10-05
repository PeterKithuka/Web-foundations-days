let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. Search notes by word (case-insensitive)
function searchNotes(word) {
  const lower = word.toLowerCase();
  return notes.filter(n => n.text.toLowerCase().includes(lower));
}
console.log("Search 'day':", searchNotes("day"));

// 2. Longest note
function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((a, b) => (a.text.length >= b.text.length ? a : b));
}
console.log("Longest note:", longestNote());

// 3. Count by category
function countByCategory() {
  return notes.reduce((acc, n) => {
    acc[n.category] = (acc[n.category] || 0) + 1;
    return acc;
  }, {});
}
console.log("Count by category:", countByCategory());

// 4. Get summary
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const parts = Object.entries(counts).map(([cat, num]) => `${num} ${cat}`);
  return `${total} notes: ${parts.join(", ")}`;
}
console.log("Summary:", getSummary());

// 5. Check duplicate
function isDuplicate(text) {
  const normalized = text.trim().toLowerCase();
  return notes.some(n => n.text.trim().toLowerCase() === normalized);
}
console.log("Is duplicate 'buy milk and bread':", isDuplicate("  Buy Milk and Bread "));

// 6. Add note
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  const trimmed = text.trim();

  if (trimmed.length < 1 || trimmed.length > 200) {
    console.log("Invalid length");
    return false;
  }
  if (isDuplicate(trimmed)) {
    console.log("Duplicate note");
    return false;
  }
  if (!validCategories.includes(category)) {
    console.log("Invalid category");
    return false;
  }

  const newId = notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  notes.push({ id: newId, text: trimmed, category });
  return true;
}

// Test addNote
console.log("Add valid note:", addNote("Practice CSS Grid", "study"));
console.log("Add duplicate:", addNote("Buy milk and bread", "personal"));
console.log("Add invalid category:", addNote("Go jogging", "fitness"));
console.log("Add too long:", addNote("x".repeat(201), "work"));
console.log("Notes after adding:", notes);