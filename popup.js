document.addEventListener('DOMContentLoaded', () => {
  getBudget((budget) => {
      const display = document.getElementById('displayBudget');
      display.innerText = budget ? `$${budget}` : '---';
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
const totalPattern = /total\s*\$\s?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+)/ig;

function spendature() {
  const element = Array.from(document.querySelectorAll("body *")).find(el => 
      el.innerText && el.innerText.toLowerCase().includes("total ")
  );

  if (element) {
      const match = element.innerText.match(/total\s*\$\s?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+)/i);
      if (match) {
          const price = match[0];
          console.log(`Found total price: ${price}`);
          return price;
      }
  }

  console.log("Total price not found.");
  return null;
}
