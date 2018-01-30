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

// check if an address is valid
kristUtils.isValidKristAddress("khugepoopy");

// check if a name is valid
kristUtils.isValidName("khugepoopy.kst");

// check if an a record is valid
kristUtils.isValidARecord("arecord");
```