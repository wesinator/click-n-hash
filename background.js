
function displayHash(hash) {
    hashStr = String.raw`${hashType}: ${hash}\n\nText:\n'${selectionOutput}'\n`; 
    console.log(hashStr);
    alert(hashStr);
}


hashTheText = function(info, tab) {
    var hashText = info.selectionText;
    var hashType = info.menuItemId;
    
    switch (hashType) {
    case "MD5":
      hash = md5(info.selectionText);
      break;
    case "SHA1":
      hash = sha1(info.selectionText);
      break;
    case "SHA256":
      hash = sha256(info.selectionText);
      break;
    case "SHA512":
      hash = sha512(info.selectionText);
      break;
  }

  if (hash) {
      var selectionOutput = info.selectionText.substring(0,4096);
      if (info.selectionText.length > 4096)
          selectionOutput = selectionOutput + "...";

      browser.tabs.executeScript({
          code: `
                hashStr = String.raw\`${hashType}: ${hash}\n\nText:\n'${selectionOutput}'\n\`; 
                console.log(hashStr);
                alert(hashStr);`
      });
      
      // display the hash in browser alert
      const tabId = getTabId();
      chrome.scripting.executeScript({
          target: {tabId: tabId},
          func: displayHash,
          args: [hash]
      });
  }
}

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
