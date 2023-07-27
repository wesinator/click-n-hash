# Click'n'Hash

[link-cws]: https://chrome.google.com/webstore/detail/clicknhash/pjjlbppplhnijdjaegiahoacpehkmcdl

A manifest v3 Chromium extension that allows you to hash selected text using the context menu (right click).

Firefox version is [HashZilla](https://github.com/wesinator/HashZilla/).

Uses [crypto-api](https://github.com/nf404/crypto-api) v0.8.5 library.

### Install

<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="16" alt="Chrome" valign="middle"> [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/pjjlbppplhnijdjaegiahoacpehkmcdl.svg">][link-cws] [<img valign="middle" src="https://img.shields.io/chrome-web-store/users/pjjlbppplhnijdjaegiahoacpehkmcdl.svg">][link-cws]

#### Known issues (specific to Chrome extension)

 - The output currently shows the hash in an alert() dialog and tab console (there are some technical challenges to getting output in the extension popup to work).
 
 Chromium has a [bug](https://crbug.com/958139) where `alert()` messages containing multiline text cannot be copied out of the alert dialog. 
   To workaround, open the console and copy the output of the hash from there.

   This issue is not present with the Firefox extension.
