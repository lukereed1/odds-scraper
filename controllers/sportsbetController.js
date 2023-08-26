const { sportsbet } = require("../scripts/sportsbet");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await sportsbet("rugby-league/nrl");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await sportsbet("australian-rules/afl");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const mlb = async (req, res) => {
	try {
		const gameData = await sportsbet("baseball/mlb-matches");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = { rugbyLeague, afl, mlb };
