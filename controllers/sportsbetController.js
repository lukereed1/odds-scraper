const { sportsbetAFL, sportsbetNRL } = require("../scripts/sportsbet");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await sportsbetNRL();
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await sportsbetAFL();
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = {
	rugbyLeague,
	afl,
};
