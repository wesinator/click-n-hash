# Click'n'Hash

A manifest v3 Chromium extension that allows you to hash selected text using the context menu (right click).

Firefox version is [HashZilla](https://github.com/wesinator/HashZilla/)

#### Known issues (specific to Chrome extension)

 - Chromium has a [stupid bug](https://crbug.com/1346156) where `alert()` messages containing multiline text cannot be copied out of the alert dialog. 
   To workaround, open the console and copy the output of the hash from there 
   
   (sorry but for now I'm too lazy to make a fancy pageAction UI that displays the hash output)

 - Multiline text is currently hashed incorrectly because of another [longstanding bug](https://crbug.com/116429) with how `info.selectionText` does text conversion in Chrome (newlines are replaced with space characters for some reason). 
 
 `document.documentElement.innerText` gives the correct expected text selection (for whole text page).
 
   These issues are not present with the Firefox extension.

#### Experience and remarks

At time of development: 

**TL,DR** the Firefox version is better and not buggy, because of differences in Firefox where it seems the Firefox API implementation is much more robust.

having written the same extension functionality for Firefox and Chromium, even after a working port to Chromium manifest v3 implementation, Chome itself has been both buggier and more astonishing in how it presents and handles multiline text. Firefox is much less buggy and astonishing for functionality of this extension.
