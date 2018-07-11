const crypto = require("crypto");

const kristUtils = {
	sha256(input) {
		return crypto.createHash("sha256").update(input.toString()).digest("hex");
	},

	hexToBase36(input) {
		const byte = 48 + Math.floor(input / 7);
		return String.fromCharCode(byte + 39 > 122 ? 101 : byte > 57 ? byte + 39 : byte);
	},

	makeV2Address(key, customPrefix) {
		const chars = ["", "", "", "", "", "", "", "", ""];
		let prefix = customPrefix || "k";
		let hash = kristUtils.sha256(kristUtils.sha256(key));

		for (let i = 0; i <= 8; i++) {
			chars[i] = hash.substring(0, 2);
			hash = kristUtils.sha256(kristUtils.sha256(hash));
		}

		for (let i = 0; i <= 8;) {
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

	makeKristWalletPrivatekey(key, doublekey) {
		return kristUtils.sha256("KRISTWALLET" + key) + "-" + (doublekey ? kristUtils.sha256(doublekey) : "000");
	},

	makeKristWalletAddress(key, doublekey, customPrefix) {
		return kristUtils.makeV2Address(kristUtils.makeKristWalletPrivatekey(key, doublekey), customPrefix);
	},

	isValidKristAddress(address, customPrefix) {
		return new RegExp(`^(?:${customPrefix || "k"}[a-z0-9]{9}|[a-f0-9]{10})$`, "i").test(address);
	},

	isValidName(name) {
		return /^[a-z0-9]{1,64}$/i.test(name);
	},

	isValidARecord(aRecord) {
		return /^[^\s\.\?\#].[^\s]*$/i.test(aRecord);
	},

	parseCommonMeta(metadata) {
		if (!metadata) return null;

		const parts = {};

		const metaParts = metadata.split(";");
		if (metaParts.length <= 0) return null;

		const nameMatches = /^(?:([a-z0-9-_]{1,32})@)?([a-z0-9]{1,64}\.kst)$/.exec(metaParts[0]);

		if (nameMatches) {
			if (nameMatches[1]) parts.metaname = nameMatches[1];
			if (nameMatches[2]) parts.name = nameMatches[2];

			parts.recipient = nameMatches[1] ? nameMatches[1] + "@" + nameMatches[2] : nameMatches[2];
		}

		for (let i = 0; i < metaParts.length; i++) {
			const metaPart = metaParts[i];
			const kv = metaPart.split("=", 2);

			if (i === 0 && nameMatches) continue;

			if (kv.length === 1) {
				parts[i.toString()] = kv[0];
			} else {
				parts[kv[0]] = kv.slice(1).join("=");
			}
		}

		return parts;
	}
};

module.exports = kristUtils;
