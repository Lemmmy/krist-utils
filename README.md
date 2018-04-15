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
