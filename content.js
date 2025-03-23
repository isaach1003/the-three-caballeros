var itemPrice; var budget;
function checkForCheckout() {
    if (window.location.origin !== "https://www.google.com") {
        if (window.location.href.includes("checkout") || window.location.href.includes("cart") || window.location.href.includes("pay")) {
            chrome.runtime.sendMessage({ action: "changePopup" });
            chrome.runtime.sendMessage({ action: "showPopup" });
            chrome.runtime.sendMessage({ action: "getTotalPrice" }, (response) => {
                console.log(response);
                console.log("RUNNING HERE!");
                if (response && response.totalPrice) {
                    const money = response.totalPrice.match(/\$?(\d+\.\d{2})/)[1];
                    if (money >= 0){
                        console.log("Total price found:", money);
                        itemPrice = money;
                        chrome.storage.local.set({ totalPrice: money});
                    } else {
                        console.log("No total price found.");
                    }
                } else if(response) {
                    console.log("No total price found.");
                } else {
                    console.log("No response from other js file.");
                }
            });
            chrome.storage.local.get(['budget'], (result) => {
                const budget = result.budget || '0';
                console.log(`Budget: $${budget}`);
            });
        }
    }
}



document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['budget'], (result) => {
        budget = result.budget || '0';
        chrome.storage.local.get('totalPrice', (data) => {
            const totalPrice = data.totalPrice;
            itemPrice = totalPrice;
            const totalDisplay = document.getElementById('totalDisplay');
            chrome.storage.local.get('expenses', (data) => {
                const expenses = data.expenses || 0;
                remainingPercent.innerText = (totalPrice/(budget-expenses)*100).toFixed(2) + '%';
            });
            //console.log('Performing: ' + totalPrice + "/" + data.budget);
            budgetPercent.innerText =  ((totalPrice/budget)*100).toFixed(2) + '%';
            totalDisplay.innerText = totalPrice ? `$${totalPrice}` : 'Price not found';
            const remaining = (budget - totalPrice).toFixed(2)
            remainingDisplay.innerText = '$' + remaining;
            if(remaining < 0){
                aboveWarning.innerText = 'Warning: You are going over budget!';
            }
            budgetDisplay.innerText = '$'+(result.budget) || '$0';
            chrome.storage.local.set({ totalPrice: null });
        });
    });

    console.log('Item price:', itemPrice);
    budgetPercent.innerText = itemPrice + '%';

    document.getElementById('close-popup').addEventListener('click', function () {
        window.close();
    });
});


checkForCheckout();
