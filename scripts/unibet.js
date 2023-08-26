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
		`https://www.unibet.com.au/betting/sports/filter/${sport}/all/matches`,
		{
			waitUntil: "networkidle0",
		}
	);
	page.setDefaultTimeout(120000);
	const teamAndOdds = await page.evaluate(() => {
		let gamesList = [];

		// All games
		const allGames = document.querySelectorAll("._4d3a0");

		const allGamesNoDuplicates = [];
		allGames.forEach((game) => {
			let participant = game.querySelectorAll(".c539a");
			allGamesNoDuplicates.push(
				participant[0].innerText,
				participant[1].innerText
			);
		});

		const allOddsIncludingLines = document.querySelectorAll(".bb419");

		const OddsDataExludingLines = [];
		// Runs if line odds are present
		if (allOddsIncludingLines.length > allGames.length) {
			for (let i = 0; i < allOddsIncludingLines.length; i += 2) {
				let matchOdds = allOddsIncludingLines[i].querySelectorAll("._8e013");
				OddsDataExludingLines.push(
					matchOdds[0].innerText,
					matchOdds[1].innerText
				);
			}
		}

		// Runs if no line odds are present
		if (allOddsIncludingLines.length * 2 === allGamesNoDuplicates.length) {
			for (let i = 0; i < allOddsIncludingLines.length; i++) {
				let matchOdds = allOddsIncludingLines[i].querySelectorAll("._8e013");
				OddsDataExludingLines.push(
					matchOdds[0].innerText,
					matchOdds[1].innerText
				);
			}
		}

		// All team names and odds, without duplicates
		let allTeamsAndOdds = [];
		for (let i = 0; i < allGamesNoDuplicates.length; i++)
			allTeamsAndOdds.push({
				team: allGamesNoDuplicates[i],
				odds: OddsDataExludingLines[i],
			});

		// Groups teams playing each other into objects with corresponding odds
		for (let i = 0; i < allTeamsAndOdds.length; i += 2) {
			let gameData = {
				bookie: "Unibet",
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
