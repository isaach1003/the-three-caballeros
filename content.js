function checkForCheckout() {
    if (window.location.href.includes("checkout") || window.location.href.includes("cart")) {
        chrome.runtime.sendMessage({action: "showPopup"});
    }
}

checkForCheckout();