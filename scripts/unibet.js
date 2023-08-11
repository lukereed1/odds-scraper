const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

/*--------------------------------------------------------------------*/
/*------------------------Rugby league and AFL------------------------*/
/*--------------------------------------------------------------------*/
async function unibet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		`https://www.unibet.com.au/betting/sports/filter/${sport}/all/matches`
	);

	const teamAndOdds = await page.evaluate(() => {
		let gamesList = [];

		const allGames = document.querySelectorAll(".c539a");
		const allOdds = document.querySelectorAll("._8e013");

		// All team names and odds including duplicates
		let allTeamsAndOdds = [];
		for (let i = 0; i < allGames.length; i++)
			allTeamsAndOdds.push({
				team: allGames[i].innerHTML,
				odds: allOdds[i].innerHTML,
			});

		// Removes duplicate teams and odds
		allTeamsAndOdds = allTeamsAndOdds.filter((value, index) => {
			const _value = JSON.stringify(value);
			return (
				index ===
				allTeamsAndOdds.findIndex((obj) => {
					return JSON.stringify(obj) === _value;
				})
			);
		});

		// Groups teams playing each other into objects with corresponding odds
		for (let i = 0; i < allTeamsAndOdds.length; i += 2) {
			let gameData = {
				firstTeam: allTeamsAndOdds[i].team,
				secondTeam: allTeamsAndOdds[i + 1].team,
				firstTeamOdds: allTeamsAndOdds[i].odds,
				secondTeamOdds: allTeamsAndOdds[i + 1].odds,
			};
			gamesList.push(gameData);
		}

		return gamesList;
	});

	await browser.close();
	return teamAndOdds;
}

module.exports = {
	unibet,
};
