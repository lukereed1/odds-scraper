const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

/*--------------------------------------------------------------------*/
/*------------------------Rugby league and AFL------------------------*/
/*--------------------------------------------------------------------*/
async function sportsbet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://www.sportsbet.com.au/betting/${sport}`);

	const teamsAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All home teams
		const team1 = document.querySelectorAll(
			"[data-automation-id='participant-one']"
		);

		// All away teams
		const team2 = document.querySelectorAll(
			"[data-automation-id='participant-two']"
		);

		// All odds data
		const teamsOdds = document.querySelectorAll(
			"[data-automation-id='price-text']"
		);

		// Creates objects of each game and inserts into games array
		for (let i = 0; i < team1.length; i++) {
			const gamesData = {
				bookie: "Sportsbet",
				firstTeam: team1[i].innerHTML,
				secondTeam: team2[i].innerHTML,
			};
			gamesList.push(gamesData);
		}

		// Gets all odds data (Removed line odds for now) and inserts into odds data array
		let oddsData = [];
		let skipCount = 0;
		for (let i = 0; i < teamsOdds.length; i++) {
			if (skipCount === 0) {
				oddsData.push(teamsOdds[i].innerHTML, teamsOdds[i + 1].innerHTML);
				skipCount = 5;
			} else {
				skipCount--;
			}
		}

		// Inserts odds into games array with corresponding teams
		let j = 0;
		for (let i = 0; i < gamesList.length; i++) {
			gamesList[i].firstTeamOdds = oddsData[j];
			gamesList[i].secondTeamOdds = oddsData[j + 1];
			j += 2;
		}

		return gamesList;
	});

	await browser.close();
	return teamsAndOdds;
}

module.exports = {
	sportsbet,
};
