const puppeteer = require("puppeteer");

/*--------------------------------------------------------------------*/
/*------------------------Rugby league and AFL------------------------*/
/*--------------------------------------------------------------------*/
async function neds(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://www.neds.com.au/sports/${sport}`);

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// Selects all teams
		const allTeams = document.querySelectorAll(".displayTitle");

		// All odds data
		const teamsOdds = document.querySelectorAll(
			"[data-testid='price-button-odds']"
		);

		// Inserts all team names into games list
		for (let i = 0; i < allTeams.length; i += 2) {
			const gamesData = {
				firstTeam: allTeams[i].innerHTML,
				secondTeam: allTeams[i + 1].innerHTML,
			};
			gamesList.push(gamesData);
		}

		// Inserts odds with teams in games list
		let j = 0;
		for (let i = 0; i < gamesList.length; i++) {
			gamesList[i].firstTeamOdds = teamsOdds[j].innerHTML;
			gamesList[i].secondTeamOdds = teamsOdds[j + 1].innerHTML;
			j += 2;
		}

		return gamesList;
	});

	await browser.close();
	return teamAndOdds;
}

module.exports = {
	neds,
};
