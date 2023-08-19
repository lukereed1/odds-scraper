const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

/*--------------------------------------------------------------------*/
/*------------------------Rugby league and AFL------------------------*/
/*--------------------------------------------------------------------*/
async function pointsbet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://pointsbet.com.au/sports/${sport}`, {
		waitUntil: "networkidle2",
	});

	const teamsAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All available games
		const allGames = document.querySelectorAll(".f2rhni5");

		// All available match and line odds
		const allOddsIncludingLines = document.querySelectorAll(".fheif50");

		// Removes line odds if present
		let oddsDataExcludingLines = [];
		if (allOddsIncludingLines.length > allGames.length * 2) {
			let skipCount = 0;
			for (let i = 0; i < allOddsIncludingLines.length; i++) {
				if (skipCount === 0) {
					oddsDataExcludingLines.push(
						allOddsIncludingLines[i].innerHTML,
						allOddsIncludingLines[i + 3].innerHTML
					);
					skipCount = 5;
				} else {
					skipCount--;
				}
			}
		} else {
			for (let i = 0; i < allOddsIncludingLines.length; i += 2) {
				oddsDataExcludingLines.push(allOddsIncludingLines[i].innerHTML);
			}
		}

		// Inserts game data into full list of games
		for (let i = 0; i < allGames.length; i += 2) {
			const gameData = {
				bookie: "Pointsbet",
				firstTeam: allGames[i].innerText,
				secondTeam: allGames[i + 1].innerText,
				firstTeamOdds: oddsDataExcludingLines[i],
				secondTeamOdds: oddsDataExcludingLines[i + 1],
			};
			gamesList.push(gameData);
		}

		return gamesList;
	});

	await browser.close();
	return teamsAndOdds;
}

module.exports = { pointsbet };
