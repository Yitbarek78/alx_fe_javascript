// ===== Default Quotes =====
const DEFAULT_QUOTES = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Wisdom" },
  { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
];

// ===== Storage Key =====
const STORAGE_KEY = "quotesAppData";

// ===== Load quotes from localStorage or fallback to default =====
let quotes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [...DEFAULT_QUOTES];

// ===== Utility: Save quotes =====
function saveQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

// ===== Display Random Quote =====
function displayRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteText").textContent = "No quotes available.";
    document.getElementById("quoteCategory").textContent = "";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById("quoteText").textContent = quote.text;
  document.getElementById("quoteCategory").textContent = `Category: ${quote.category}`;
}

// ===== Add New Quote =====
function addQuote(text, category) {
  if (!text.trim()) {
    alert("Quote text cannot be empty");
    return;
  }
  const newQuote = { text: text.trim(), category: category.trim() || "General" };
  quotes.push(newQuote);
  saveQuotes();
  displayRandomQuote();
}

// ===== Import Quotes from JSON File =====
function importFromJsonFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = function(ev) {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");

      // Normalize and merge
      for (const item of imported) {
        if (item.text && item.category) {
          quotes.push({ text: item.text, category: item.category });
        }
      }
      saveQuotes();
      alert("Quotes imported successfully!");
      displayRandomQuote();
    } catch (err) {
      console.error(err);
      alert("Invalid JSON file.");
    } finally {
      event.target.value = ""; // reset file input
    }
  };
  fileReader.readAsText(file);
}

// ===== Export Quotes to JSON File =====
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `quotes-${date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ===== Reset Quotes =====
function clearAll() {
  if (!confirm("This will remove all your saved quotes and restore defaults. Continue?")) return;
  localStorage.removeItem(STORAGE_KEY);
  quotes = [...DEFAULT_QUOTES];
  saveQuotes();
  displayRandomQuote();
  alert("Storage cleared. Default quotes restored.");
}

// ===== Event Listeners =====
document.getElementById("newQuoteBtn").addEventListener("click", displayRandomQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("clearBtn").addEventListener("click", clearAll);

// ===== Show one on page load =====
displayRandomQuote();



// ===== Quotes Array =====
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Wisdom" },
  { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
];

// ===== Show Random Quote =====
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Use innerHTML as required
  document.getElementById("quoteText").innerHTML = quote.text;
  document.getElementById("quoteCategory").innerHTML = `Category: ${quote.category}`;
}

// ===== Add New Quote =====
function addQuote(text, category) {
  if (!text.trim()) {
    alert("Quote text cannot be empty");
    return;
  }
  quotes.push({ text: text.trim(), category: category.trim() || "General" });
  showRandomQuote();
}

// ===== Event Listener for "Show New Quote" Button =====
document.getElementById("newQuoteBtn")
  .addEventListener("click", showRandomQuote);

// ===== Show one quote on page load =====
showRandomQuote();
