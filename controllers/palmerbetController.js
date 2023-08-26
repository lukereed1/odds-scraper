const { palmerbet } = require("../scripts/palmerbet");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = await palmerbet(
			"https://www.palmerbet.com/sports/rugby-league/Australia%20National%20Rugby%20League/cf404de1-1953-4d55-b92e-4e022f186b22"
		);
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const afl = async (req, res) => {
	try {
		const gameData = await palmerbet(
			"https://www.palmerbet.com/sports/australian-rules/Australia%20Football%20League/fe2b1527-89d2-417b-818a-382ed1496ded"
		);
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const mlb = async (req, res) => {
	try {
		const gameData = await palmerbet(
			"https://www.palmerbet.com/sports/baseball/Major%20League%20Baseball/b9a61a6f-4cc3-400a-8495-ccee7c7d7779"
		);
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = { rugbyLeague, afl, mlb };
