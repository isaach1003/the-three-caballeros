chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "showPopup") {
            chrome.action.openPopup();
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "changePopup") {
            chrome.action.setPopup({popup: "popup.html"});
        }
    }
);

