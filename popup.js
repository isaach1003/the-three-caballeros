document.addEventListener('DOMContentLoaded', () => {
  getBudget((budget) => {
      const display = document.getElementById('displayBudget');
      if (budget) {
          display.innerText = `$${budget}`;
      } else {
          display.innerText = 'Not set';
      }
  });
});
//test
document.getElementById('budget').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getInput();
  }
});
document.getElementById('save').addEventListener('click', (event) => {
  getInput();
});
function getInput(){
  event.preventDefault();
  let budget = document.getElementById('budget').value.match(/0*(\d+)/)?.[1] || '0'; //should ignore leading 0s and symbols and return 0 if nothing is detected
  saveBudget(budget);
  document.getElementById('message').innerText = 'Budget saved!';
  document.getElementById('displayBudget').innerText = `$${budget}`;
}
function saveBudget(amount) {
  //amount = (\d*);
  chrome.storage.local.set({ budget: amount }, () => {
      //console.log(`Budget set to $${amount}`);
  });
}
function getBudget(callback) {
  chrome.storage.local.get(['budget'], (result) => {
      //console.log('Budget:', result.budget);
      callback(result.budget);
  });
}

