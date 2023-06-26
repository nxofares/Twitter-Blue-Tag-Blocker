chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Check if the URL corresponds to a Twitter profile
    if (details.url.startsWith("https://twitter.com/")) {
      // Get the username from the URL
      const username = details.url.split("/")[3];
      
      // Check if the user has a blue verification badge
      chrome.tabs.executeScript(details.tabId, {
        code: `
          const userElement = document.querySelector(
            'a[href="/${username}"] span[aria-label="Verified account"]'
          );
          if (userElement) {
            chrome.tabs.update(details.tabId, {url: "https://twitter.com/"});
          }
        `
      });
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
