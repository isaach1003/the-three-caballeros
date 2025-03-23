document.addEventListener('DOMContentLoaded', function () {
    // Get all necessary data from local storage
    chrome.storage.local.get(['budget', 'expenses', 'totalPrice'], (result) => {
        const budget = result.budget;
        const totalPrice = result.totalPrice;
        const expenses = result.expenses;
        
        const remainingBudget = (budget - expenses - totalPrice).toFixed(2);

        totalBudgetDisplay.innerText = `$${budget}`;
        currentExpensesDisplay.innerText = `$${expenses.toFixed(2)}`;
        remainingBudgetDisplay.innerText = `$${remainingBudget}`;
    });
});
