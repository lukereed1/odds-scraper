const { pointsbet, pointsbetSoccer } = require("../scripts/pointsbet");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await pointsbet("rugby-league/NRL");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await pointsbet("aussie-rules/AFL");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const mlb = async (req, res) => {
	try {
		const gameData = await pointsbet("baseball/MLB");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const epl = async (req, res) => {
	try {
		const gameData = await pointsbetSoccer("English-Premier-League");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = { rugbyLeague, afl, mlb, epl };
