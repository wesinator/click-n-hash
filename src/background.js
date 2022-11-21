importScripts('./hash.js', './include/crypto-api.min.js')

function displayHash(hashText, hashType, hash) {
    // truncate long text String
    var selectionOutput = hashText.substring(0,4096);
      if (hashText.length > 4096)
          selectionOutput = selectionOutput + "...";

    hashStr = `${hashType.toUpperCase()}: ${hash}\n\nText:\n'${selectionOutput}'\n`; 
    console.log(hashStr);
    alert(hashStr);
}


hashTheText = function(info, tab) {
    var hashText = info.selectionText;
    var hashType = info.menuItemId;
    var hash = null;
    
    switch (hashType) {
        case "md5":
            hash = md5(info.selectionText);
            break;
        case "sha1":
            hash = sha1(info.selectionText);
            break;
        case "sha256":
            hash = sha256(info.selectionText);
            break;
        case "sha512":
            hash = sha512(info.selectionText);
            break;
    }

  if (hash) {
      // display the hash in browser alert
      chrome.scripting.executeScript({
          target: {tabId: tab.id},
          func: displayHash,
          args: [hashText, hashType, hash]
      });
  }
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "md5",
        title: "MD5 (insecure)",
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "separator0",
        type: "separator",
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "sha1",
        title: "SHA1 (insecure)",
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "sha256",
        title: "SHA256",
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "sha512",
        title: "SHA512",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(hashTheText);
