const crypto = require("crypto");

const kristUtils = {
	sha256(input) {
		return crypto.createHash("sha256").update(input.toString()).digest("hex");
	},

	hexToBase36(input) {
		for (let i = 6; i <= 251; i += 7) {
			if (input <= i) {
				if (i <= 69) {
					return String.fromCharCode(("0".charCodeAt(0)) + (i - 6) / 7);
				}

				return String.fromCharCode(("a".charCodeAt(0)) + ((i - 76) / 7));
			}
		}

		return "e";
	},

	makeV2Address(key, customPrefix) {
		const chars = ["", "", "", "", "", "", "", "", ""];
		let prefix = customPrefix || "k";
		let hash = kristUtils.sha256(kristUtils.sha256(key));

		for (let i = 0; i <= 8; i++) {
			chars[i] = hash.substring(0, 2);
			hash = kristUtils.sha256(kristUtils.sha256(hash));
		}

		for (i = 0; i <= 8;) {
			const index = parseInt(hash.substring(2 * i, 2 + (2 * i)), 16) % 9;

			if (chars[index] === "") {
				hash = kristUtils.sha256(hash);
			} else {
				prefix += kristUtils.hexToBase36(parseInt(chars[index], 16));
				chars[index] = "";
				i++;
			}
		}

		return prefix;
	},

	isValidKristAddress(address, customPrefix) {
		return new RegExp(`^(?:${customPrefix || "k"}[a-z0-9]{9}|[a-f0-9]{10})$`, "i").test(address);
	},

	isValidName(name) {
		return /^[a-z0-9]{1,64}$/i.test(name);
	},

	isValidARecord(aRecord) {
		return /^[^\s\.\?\#].[^\s]*$/i.test(aRecord);
	}
};

module.exports = kristUtils;