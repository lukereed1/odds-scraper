const { unibet } = require("../scripts/unibet");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await unibet("rugby_league/nrl");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await unibet("australian_rules/afl");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
module.exports = { rugbyLeague, afl };
