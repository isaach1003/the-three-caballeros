
document.addEventListener('DOMContentLoaded', () => {
    getBudget((budget) => {

      console.log(`Current budget: $${budget || 'Not set'}`);
    });
    
    document.getElementById('need').addEventListener('click', () => {
      recordPurchase('need');
    });
    
    document.getElementById('want').addEventListener('click', () => {
      recordPurchase('want');
    });
    
    document.getElementById('fun').addEventListener('click', () => {
      recordPurchase('fun');
    });
    
    document.getElementById('close-popup').addEventListener('click', () => {
      window.close();
    });
  });
  
  function recordPurchase(type) {
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const currentUrl = tabs[0].url;
      console.log(`Recording ${type} purchase from: ${currentUrl}`);
      
      chrome.storage.local.get(['purchases'], (result) => {
        const purchases = result.purchases || {};
        purchases[Date.now()] = {
          type: type,
          url: currentUrl
         
        };
        
        chrome.storage.local.set({ purchases: purchases }, () => {
          console.log('Purchase recorded!');
          
          const message = document.querySelector('p');
          message.textContent = `Purchase recorded as: ${type.toUpperCase()}`;
          
        });
      });
    });
  }
  
  function getBudget(callback) {
    chrome.storage.local.get(['budget'], (result) => {
      callback(result.budget);
    });
  }