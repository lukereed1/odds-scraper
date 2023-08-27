const { topsport, topsportSoccer } = require("../scripts/topsport");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await topsport("rugby-league");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await topsport("afl");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const mlb = async (req, res) => {
	try {
		const gameData = await topsport("mlb");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const epl = async (req, res) => {
	try {
		const gameData = await topsportSoccer("English_Premier_League/Matches");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = { rugbyLeague, afl, mlb, epl };
