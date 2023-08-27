const { neds, nedsSoccer } = require("../scripts/neds");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await neds("rugby-league/nrl");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await neds("australian-rules/afl");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const mlb = async (req, res) => {
	try {
		const gameData = await neds("baseball/mlb");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const epl = async (req, res) => {
	try {
		const gameData = await nedsSoccer("uk-ireland/premier-league");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = { rugbyLeague, afl, mlb, epl };
