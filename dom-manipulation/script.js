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

// ===== Create Add Quote Form =====
function createAddQuoteForm(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const form = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "newQuoteText";
  textInput.placeholder = "Quote text";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  // Event listener for the button
  addButton.addEventListener("click", () => {
    addQuote(textInput.value, categoryInput.value);
    textInput.value = "";
    categoryInput.value = "";
  });

  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(addButton);
  container.appendChild(form);
}

// ===== Initialize =====

document.getElementById("newQuoteBtn").addEventListener("click", showRandomQuote);

// Call function to create form dynamically
createAddQuoteForm("addQuoteContainer");

// Show a random quote on load
showRandomQuote();

// ===== Storage Keys =====
const STORAGE_QUOTES = "quotes";
const STORAGE_FILTER = "lastFilter";

// ===== Default Quotes =====
let quotes = JSON.parse(localStorage.getItem(STORAGE_QUOTES)) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Wisdom" },
  { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
];

// ===== Show Random Quote =====
function showRandomQuote() {
  const currentFilter = localStorage.getItem(STORAGE_FILTER) || "all";
  const filtered = currentFilter === "all" ? quotes : quotes.filter(q => q.category === currentFilter);

  if (filtered.length === 0) {
    document.getElementById("quoteText").innerHTML = "No quotes in this category.";
    document.getElementById("quoteCategory").innerHTML = "";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];

  document.getElementById("quoteText").innerHTML = quote.text;
  document.getElementById("quoteCategory").innerHTML = `Category: ${quote.category}`;
}

// ===== Add New Quote =====
function addQuote(text, category) {
  if (!text.trim()) {
    alert("Quote text cannot be empty");
    return;
  }
  const newQuote = { text: text.trim(), category: category.trim() || "General" };
  quotes.push(newQuote);

  // Save to storage
  localStorage.setItem(STORAGE_QUOTES, JSON.stringify(quotes));

  // Update dropdown if new category introduced
  populateCategories();

  // Show new quote immediately
  showRandomQuote();
}

// ===== Create Add Quote Form =====
function createAddQuoteForm(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const form = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "newQuoteText";
  textInput.placeholder = "Quote text";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", () => {
    addQuote(textInput.value, categoryInput.value);
    textInput.value = "";
    categoryInput.value = "";
  });

  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(addButton);
  container.appendChild(form);
}

// ===== Populate Categories Dropdown =====
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const selected = localStorage.getItem(STORAGE_FILTER) || "all";

  // Reset options
  dropdown.innerHTML = `<option value="all">All Categories</option>`;

  // Unique categories from quotes
  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    if (cat === selected) option.selected = true;
    dropdown.appendChild(option);
  });
}

// ===== Filter Quotes =====
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem(STORAGE_FILTER, selected);
  showRandomQuote();
}

// ===== Initialize =====
document.getElementById("newQuoteBtn").addEventListener("click", showRandomQuote);

createAddQuoteForm("addQuoteContainer");
populateCategories();
showRandomQuote();


// ===== Storage Keys =====
const STORAGE_QUOTES = "quotesAppData";
const STORAGE_LAST_QUOTE = "lastViewedQuote"; // sessionStorage key

// ===== Default Quotes =====
const DEFAULT_QUOTES = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Wisdom" },
  { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
];

// ===== Load from Local Storage =====
let quotes = JSON.parse(localStorage.getItem(STORAGE_QUOTES)) || [...DEFAULT_QUOTES];

// ===== Save to Local Storage =====
function saveQuotes() {
  localStorage.setItem(STORAGE_QUOTES, JSON.stringify(quotes));
}

// ===== Display Random Quote =====
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteText").innerHTML = "No quotes available.";
    document.getElementById("quoteCategory").innerHTML = "";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Save to sessionStorage (last viewed)
  sessionStorage.setItem(STORAGE_LAST_QUOTE, JSON.stringify(quote));

  document.getElementById("quoteText").innerHTML = quote.text;
  document.getElementById("quoteCategory").innerHTML = `Category: ${quote.category}`;
}

// ===== Restore Last Viewed Quote from Session =====
function restoreLastQuote() {
  const lastQuote = JSON.parse(sessionStorage.getItem(STORAGE_LAST_QUOTE));
  if (lastQuote) {
    document.getElementById("quoteText").innerHTML = lastQuote.text;
    document.getElementById("quoteCategory").innerHTML = `Category: ${lastQuote.category}`;
    return true;
  }
  return false;
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
  showRandomQuote();
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

      // Merge valid quotes
      imported.forEach(item => {
        if (item.text && item.category) {
          quotes.push({ text: item.text, category: item.category });
        }
      });

      saveQuotes();
      alert("Quotes imported successfully!");
      showRandomQuote();
    } catch (err) {
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
  if (!confirm("This will clear your saved quotes and restore defaults. Continue?")) return;
  localStorage.removeItem(STORAGE_QUOTES);
  sessionStorage.removeItem(STORAGE_LAST_QUOTE);
  quotes = [...DEFAULT_QUOTES];
  saveQuotes();
  showRandomQuote();
}

// ===== Event Listeners =====
document.getElementById("newQuoteBtn").addEventListener("click", showRandomQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("clearBtn").addEventListener("click", clearAll);

// ===== Init: Show last viewed or random =====
if (!restoreLastQuote()) {
  showRandomQuote();
}

// ===== Storage Keys =====
const STORAGE_QUOTES = "quotes";
const STORAGE_FILTER = "lastFilter";

// ===== Default Quotes =====
let quotes = JSON.parse(localStorage.getItem(STORAGE_QUOTES)) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Wisdom" },
  { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
];

// ===== Save Quotes =====
function saveQuotes() {
  localStorage.setItem(STORAGE_QUOTES, JSON.stringify(quotes));
}

// ===== Show Random Quote =====
function showRandomQuote() {
  const currentFilter = localStorage.getItem(STORAGE_FILTER) || "all";
  const filtered = currentFilter === "all" ? quotes : quotes.filter(q => q.category === currentFilter);

  if (filtered.length === 0) {
    document.getElementById("quoteText").innerHTML = "No quotes in this category.";
    document.getElementById("quoteCategory").innerHTML = "";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];

  document.getElementById("quoteText").innerHTML = quote.text;
  document.getElementById("quoteCategory").innerHTML = `Category: ${quote.category}`;
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
  populateCategories(); // update dropdown with new category if needed
  showRandomQuote();
}

// ===== Create Add Quote Form =====
function createAddQuoteForm(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const form = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "newQuoteText";
  textInput.placeholder = "Quote text";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", () => {
    addQuote(textInput.value, categoryInput.value);
    textInput.value = "";
    categoryInput.value = "";
  });

  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(addButton);
  container.appendChild(form);
}

// ===== Populate Categories Dropdown =====
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const selected = localStorage.getItem(STORAGE_FILTER) || "all";

  dropdown.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    if (cat === selected) option.selected = true;
    dropdown.appendChild(option);
  });
}

// ===== Filter Quotes =====
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem(STORAGE_FILTER, selected);
  showRandomQuote();
}

// ===== Import Quotes from JSON =====
function importFromJsonFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = function(ev) {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");

      for (const item of imported) {
        if (item.text && item.category) {
          quotes.push({ text: item.text, category: item.category });
        }
      }
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
      showRandomQuote();
    } catch (err) {
      alert("Invalid JSON file.");
    } finally {
      event.target.value = "";
    }
  };
  fileReader.readAsText(file);
}

// ===== Export Quotes to JSON =====
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
  localStorage.removeItem(STORAGE_QUOTES);
  localStorage.removeItem(STORAGE_FILTER);
  quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of difficulty lies opportunity.", category: "Wisdom" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
  ];
  saveQuotes();
  populateCategories();
  showRandomQuote();
  alert("Storage cleared. Default quotes restored.");
}

// ===== Initialize =====
document.getElementById("newQuoteBtn").addEventListener("click", showRandomQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("clearBtn").addEventListener("click", clearAll);

createAddQuoteForm("addQuoteContainer");
populateCategories();
showRandomQuote();

// ===== Show Random Quote =====
function showRandomQuote() {
  const currentFilter = localStorage.getItem(STORAGE_FILTER) || "all";
  const filtered = currentFilter === "all" ? quotes : quotes.filter(q => q.category === currentFilter);

  const display = document.getElementById("quoteDisplay");

  if (filtered.length === 0) {
    display.innerHTML = "No quotes in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];

  display.innerHTML = `"${quote.text}" <br><em>Category: ${quote.category}</em>`;
}

// ===== Filter Quotes =====
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;

  // Save filter to local storage
  localStorage.setItem(STORAGE_FILTER, selected);

  // Update the displayed quotes immediately
  showRandomQuote();
}

// ===== Populate Categories =====
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const selected = localStorage.getItem(STORAGE_FILTER) || "all";

  dropdown.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    if (cat === selected) option.selected = true; // restore last filter
    dropdown.appendChild(option);
  });
}

const STORAGE_KEY = "quotes";
const STORAGE_FILTER = "selectedCategory";

let quotes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Resilience" }
];

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
  const currentFilter = localStorage.getItem(STORAGE_FILTER) || "all";
  const filtered = currentFilter === "all" ? quotes : quotes.filter(q => q.category === currentFilter);

  const display = document.getElementById("quoteDisplay");

  if (filtered.length === 0) {
    display.innerHTML = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];

  display.innerHTML = `"${quote.text}" <br><em>Category: ${quote.category}</em>`;
}

// Populate category dropdown
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const selected = localStorage.getItem(STORAGE_FILTER) || "all";

  dropdown.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    if (cat === selected) option.selected = true; // ✅ restore last selected filter
    dropdown.appendChild(option);
  });
}

// Filter quotes and update DOM
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;

  // ✅ save to localStorage
  localStorage.setItem(STORAGE_FILTER, selected);

  // ✅ update displayed quotes immediately
  showRandomQuote();
}

// Add new quote
function addQuote(text, category) {
  quotes.push({ text, category });
  saveQuotes();
  populateCategories(); // update categories if new one is added
  showRandomQuote();
}

// Event listeners
document.getElementById("newQuoteBtn").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", () => {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();
  if (text && category) {
    addQuote(text, category);
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
});

// On page load
populateCategories();
showRandomQuote();


