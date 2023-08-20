const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

/*--------------------------------------------------------------------*/
/*------------------------Rugby League, AFL---------------------------*/
/*--------------------------------------------------------------------*/
async function sportsbet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://www.sportsbet.com.au/betting/${sport}`, {
		waitUntil: "networkidle2",
	});

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
		const teamsOddsColumn = document.querySelectorAll(
			".market-coupon-col-0.gridColumn_frfjtr6"
		);

		const allOdds = [];
		teamsOddsColumn.forEach((game) => {
			let odds = game.querySelectorAll(".priceButton_f1h1fl2e");
			odds.forEach((oddsData) => allOdds.push(oddsData.innerText));
		});

		// Creates objects of each game and inserts into games array
		for (let i = 0; i < team1.length; i++) {
			const gamesData = {
				bookie: "Sportsbet",
				firstTeam: team1[i].innerHTML,
				secondTeam: team2[i].innerHTML,
			};
			gamesList.push(gamesData);
		}

		// Inserts odds
		let j = 0;
		for (let i = 0; i < allOdds.length; i += 2) {
			gamesList[j].firstTeamOdds = allOdds[i];
			gamesList[j].secondTeamOdds = allOdds[i + 1];
			j++;
		}

		return gamesList;
	});

	await browser.close();
	return teamsAndOdds;
}

module.exports = {
	sportsbet,
};
