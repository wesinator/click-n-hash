# Click'n'Hash

A manifest v3 Chromium extension that allows you to hash selected text using the context menu (right click).

Firefox version is [HashZilla](https://github.com/wesinator/HashZilla/)

#### Known issues (specific to Chrome extension)

 - Chromium has a [stupid bug](https://crbug.com/1346156) where `alert()` messages containing multiline text cannot be copied out of the alert dialog. 
   To workaround, open the console and copy the output of the hash from there 
   
   (sorry but for now I'm too lazy to make a fancy pageAction UI that displays the hash output)

 - Multiline text may be hashed incorrectly because of encoding. 
   These issue are not present with the Firefox extension.
