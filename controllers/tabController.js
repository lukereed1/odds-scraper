const { tab, tabSoccer } = require("../scripts/tab");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await tab("Rugby%20League/competitions/NRL");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await tab("AFL%20Football/competitions/AFL");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const mlb = async (req, res) => {
	try {
		const gameData = await tab(
			"Baseball/competitions/Major%20League%20Baseball"
		);
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const epl = async (req, res) => {
	try {
		const gameData = await tabSoccer("English%20Premier%20League");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = { rugbyLeague, afl, mlb, epl };
