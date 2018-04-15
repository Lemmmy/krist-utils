# krist-utils

# Installation

```
npm i -S krist-utils
```

# Usage

```js
const kristUtils = require("krist-utils");

// synchronously sha256 a string
kristUtils.sha256("Hello, world!");

// generate a v2 address from a privatekey
kristUtils.makeV2Address("password");

// generate a v2 address from a privatekey with custom prefix
kristUtils.makeV2Address("password", "l");

// generate a kristwallet privatekey from a password
kristUtils.makeKristWalletPrivatekey("password");

// generate a kristwallet privatekey from a password with a doublekey
kristUtils.makeKristWalletPrivatekey("password", "doublekey");

// generate a kristwallet address from a password
kristUtils.makeKristWalletAddress("password");

// generate a kristwallet address from a password with a doublekey
kristUtils.makeKristWalletAddress("password", "doublekey");

// generate a kristwallet address from a password with a doublekey and a custom prefix
kristUtils.makeKristWalletAddress("password", "doublekey", "l");

// generate a kristwallet address from a password with just a custom prefix
kristUtils.makeKristWalletAddress("password", null, "l");

// check if an address is valid
kristUtils.isValidKristAddress("khugepoopy");

// check if an address is valid with custom prefix
kristUtils.isValidKristAddress("lhugepoopy", "l");

// check if a name is valid
kristUtils.isValidName("khugepoopy.kst");

// check if an a record is valid
kristUtils.isValidARecord("arecord");

// parse CommonMeta
kristUtils.parseCommonMeta("item@shop.kst;username=Lemmmy;return=lemmmy@switchcraft.kst");
```
