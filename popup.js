document.addEventListener('DOMContentLoaded', () => {
  // Display the current budget when the popup loads
  getBudget((budget) => {
      const display = document.getElementById('displayBudget');
      if (budget) {
          display.innerText = `$${budget}`;
      } else {
          display.innerText = 'Not set';
      }
  });
});

document.getElementById('save').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  const budget = document.getElementById('budget').value;
  saveBudget(budget);
  document.getElementById('message').innerText = 'Budget saved!';
  document.getElementById('displayBudget').innerText = `$${budget}`;
});


function saveBudget(amount) {
  //amount = (\d*);
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
