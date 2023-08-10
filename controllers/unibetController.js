const { unibet } = require("../scripts/unibet");

const rugbyLeague = async (req, res) => {
	try {
		const gameData = unibet("rugby_league/nrl");
		res.status(200).json(gameData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.export = { rugbyLeague };
