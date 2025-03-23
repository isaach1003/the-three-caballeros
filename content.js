function checkForCheckout() {
    if (window.location.href.includes("checkout") || window.location.href.includes("cart")) {
        chrome.runtime.sendMessage({action: "changePopup"});
        chrome.runtime.sendMessage({action: "showPopup"});
    }
}

checkForCheckout();