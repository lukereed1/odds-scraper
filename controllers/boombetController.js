const { boombet } = require("../scripts/boombet");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await boombet("Rugby%20League/Australia%20NRL");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await boombet("Australian%20Rules/AFL");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const mlb = async (req, res) => {
	try {
		const gameData = await boombet("Baseball/US%20Major%20League%20Baseball");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = { rugbyLeague, afl, mlb };
