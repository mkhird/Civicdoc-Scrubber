const button = document.getElementById("toggle");
const status = document.getElementById("status");

button.addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    await chrome.tabs.sendMessage(tab.id, { type: "TOGGLE" });
    status.textContent = "Status: Active";
  } catch (e) {
    status.textContent = "Status: Not available on this page";
  }
});
