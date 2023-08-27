const { betdeluxe, betdeluxeSoccer } = require("../scripts/betdeluxe");

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

const mlb = async (req, res) => {
	try {
		const gameData = await betdeluxe(
			"https://betdeluxe.com.au/sports/baseball/major-league-baseball-1000054?gclid=EAIaIQobChMIgLa6hsP5gAMVHtMWBR0daAJvEAAYAiAAEgJ37vD_BwE"
		);
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const epl = async (req, res) => {
	try {
		const gameData = await betdeluxeSoccer("england-premier-league-1000009");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = { rugbyLeague, afl, mlb, epl };
