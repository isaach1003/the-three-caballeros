document.getElementById("close-popup").addEventListener("click", () => {
    window.close();
  });

  function saveBudget(amount) {
    chrome.storage.local.set({ budget: amount }, () => {
        console.log(`Budget set to $${amount}`);
    });
}

function getBudget(callback) {
    chrome.storage.local.get(['budget'], (result) => {
        console.log('Budget:', result.budget);
        callback(result.budget);
    });
}
