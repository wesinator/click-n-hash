importScripts('./hash.js', './include/crypto-api.min.js')

/* two executeScript calls are used in order to workaround https://bugs.chromium.org/p/chromium/issues/detail?id=116429
the first calls sendHashMsg() to send the correct text selection to the extension background message listener. 
The listener then sends the correct text selection to genHash() which runs the second executeScript to display the output in the active tab.
*/

// function to display string output in tab
function displayInTab(string) {
    console.log(string);
    alert(string);
}

/*
tab var is needed for tabId to display output
*/
function genHash(tab, hashText, hashType) {
    var hash = null;
    switch (hashType) {
        case "md5":
            hash = md5(hashText);
            break;
        case "sha1":
            hash = sha1(hashText);
            break;
        case "sha256":
            hash = sha256(hashText);
            break;
        case "sha512":
            hash = sha512(hashText);
            break;
    }
    
    // truncate long text String
    var selectionOutput = hashText.substring(0,4096);
      if (hashText.length > 4096)
          selectionOutput = selectionOutput + "...";

    hashStr = `${hashType.toUpperCase()}: ${hash}\n\n${chrome.i18n.getMessage("TextHeading")}\n'${selectionOutput}'\n`;
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: displayInTab,
        args: [hashStr]
    });
}

function sendHashMsg(hashType) {
    // https://developer.chrome.com/docs/extensions/mv3/messaging/
    (async () => {
        const response = await chrome.runtime.sendMessage({hashType: hashType, hashText: window.getSelection().toString()});
        // do something with response here, not outside the function
        //console.log(response);
    })();
}

hashTheText = function(info, tab) {
    var hashType = info.menuItemId;
    
      // display the hash in browser alert
      chrome.scripting.executeScript({
          target: {tabId: tab.id},
          func: sendHashMsg,
          args: [hashType]
      });
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "md5",
        title: chrome.i18n.getMessage("MD5"),
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "separator0",
        type: "separator",
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "sha1",
        title: chrome.i18n.getMessage("SHA1"),
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "sha256",
        title: chrome.i18n.getMessage("SHA256"),
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "sha512",
        title: chrome.i18n.getMessage("SHA512"),
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(hashTheText);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script: " + sender.tab.url :
                "from the extension");
    var hashType = request.hashType;
    if (hashType) {
        genHash(sender.tab, request.hashText, request.hashType);
        //sendResponse({farewell: "thanks for sending! goodbye"});
    }
  }
);
