chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("careers"){
        const queryParameter = tab.url.split("?")[1];
        const urlParameter = new URLSearchParams(queryParameter);

        chrome.tab.sendMessage(tabId, {
            type : "NEW",
            j_company : urlParameter.get("/") // need to fill this for background

        });

    }
});