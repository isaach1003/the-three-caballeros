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
                    console.log("Total price found:", money);
                    chrome.storage.local.set({ totalPrice: money});
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
        budgetDisplay.innerText = '$'+result.budget || '$0';
    });
    chrome.storage.local.get('totalPrice', (data) => {
        const totalPrice = data.totalPrice;
        const totalDisplay = document.getElementById('totalDisplay');

        if (totalPrice) {
            totalDisplay.innerText = `$${totalPrice}`;
        } else {
            totalDisplay.innerText = 'Price not found';
        }
    });

    document.getElementById('close-popup').addEventListener('click', function () {
        window.close();
    });
});


checkForCheckout();
