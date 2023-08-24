const { betdeluxe } = require("../scripts/betdeluxe");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await betdeluxe(
			"https://betdeluxe.com.au/sports/rugby-league/telstra-premiership-1000076"
		);
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await betdeluxe(
			"https://betdeluxe.com.au/sports/australian-rules/toyota-afl-premiership-1000064"
		);
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = { rugbyLeague, afl };
