let enabled = false;

const patterns = [
  /\b\d{3}-\d{2}-\d{4}\b/g, // SSN-like
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, // Email
  /(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/g // Phone numbers
];

function redactText(root) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while ((node = walker.nextNode())) {
    if (!node.parentElement) continue;

    let original = node.nodeValue;
    let redacted = original;

    patterns.forEach((regex) => {
      redacted = redacted.replace(regex, "[REDACTED]");
    });

    if (redacted !== original) {
      node.nodeValue = redacted;
    }
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "TOGGLE") {
    enabled = !enabled;
    if (enabled) redactText(document.body);
  }
});
