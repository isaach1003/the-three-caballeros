chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showPopup") {
        chrome.action.openPopup();
    }

    if (request.action === "changePopup") {
        chrome.action.setPopup({ popup: "popup.html" });
    }
    if (request.action === "simpleTest") {
        sendResponse({ result: "Success" }); 
    }

    if (request.action === "getTotalPrice") {
        chrome.scripting.executeScript(
            { 
                target: { tabId: sender.tab.id },
                func: function () {
                    const element = Array.from(document.querySelectorAll("body *")).find(el =>
                        el.innerText && el.innerText.toLowerCase().includes("total")
                    );

                    if (element) {
                        
                        const match = element.innerText.match(/total[\s:]*\$\s?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+)/i);

                        if (match) {
                            const price = match[0];
                            return price;
                        }
                    }

                    return -2;
                },
            },
            (results) => {
                if (chrome.runtime.lastError) {
                    sendResponse({ totalPrice: null});
                } else if (results && results[0] && results[0].result) {
                    console.log("Background got price:", results[0].result);
                    sendResponse({ totalPrice: results[0].result });
                } else {
                    console.log("Background: No price found.");
                    sendResponse({ totalPrice: -1 });
                }
            }
        );
        return true; 
    }
});
