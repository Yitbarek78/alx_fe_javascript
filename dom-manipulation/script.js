// Export quotes to JSON file
function exportToJson() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
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

// Normalizes any supported JSON structure into [{text, author}] and deduplicates
function normalizeQuotes(input) {
  let arr = [];
  if (Array.isArray(input)) arr = input;
  else if (input && Array.isArray(input.quotes)) arr = input.quotes;
  else return [];

  const out = [];
  for (const item of arr) {
    if (typeof item === "string") {
      const t = item.trim();
      if (t) out.push({ text: t, author: "Unknown" });
    } else if (item && typeof item === "object") {
      const t = (item.text || "").toString().trim();
      const a = (item.author || "Unknown").toString().trim() || "Unknown";
      if (t) out.push({ text: t, author: a });
    }
  }

  // Deduplicate by text+author (case-insensitive)
  const seen = new Set();
  const deduped = [];
  for (const q of out) {
    const key = (q.text + "|" + q.author).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(q);
    }
  }
  return deduped;
}

// Merge new quotes into existing (deduped)
function mergeQuotes(newOnes) {
  const current = new Map(
    quotes.map((q) => [(q.text + "|" + q.author).toLowerCase(), q])
  );
  for (const q of newOnes) {
    const key = (q.text + "|" + q.author).toLowerCase();
    if (!current.has(key)) current.set(key, q);
  }
  quotes = Array.from(current.values());
}

// Required by the task – keep this signature
function importFromJsonFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = function (ev) {
    try {
      const raw = ev.target.result;
      const imported = JSON.parse(raw);
      const normalized = normalizeQuotes(imported);
      if (!normalized.length) {
        alert("No valid quotes found in file.");
        return;
      }
      mergeQuotes(normalized);
      saveQuotes();
      alert("Quotes imported successfully!");
      setQuoteIntoUI(quotes[quotes.length - 1], quotes.length - 1);
    } catch (err) {
      console.error(err);
      alert("Invalid JSON file. Please provide a valid quotes JSON.");
    } finally {
      // reset input so user can re-import the same file
      event.target.value = "";
    }
  };
  fileReader.readAsText(file);
}

function clearAll() {
  if (
    !confirm(
      "This will remove all your saved quotes and restore defaults. Continue?"
    )
  )
    return;
  safeRemoveItem(STORAGE_KEY);
  quotes = [...DEFAULT_QUOTES];
  saveQuotes(); // re-seed to storage so the app continues to work as expected
  setQuoteIntoUI(quotes[0], 0);
  alert("Storage cleared. Restored default quotes.");
}

function copyCurrent() {
  const q = quotes[cursor];
  if (!q) return;
  const payload = `${q.text}\n— ${q.author}`;
  navigator.clipboard
    .writeText(payload)
    .then(() => alert("Quote copied to clipboard!"))
    .catch(() => alert("Failed to copy quote."));
}
