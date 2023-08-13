const { all } = require("axios");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function tab(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://www.tab.com.au/sports/betting/${sport}`, {
		waitUntil: "networkidle2",
	});

	const teamsAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// Teams playing each other
		const allGames = document.querySelectorAll(".match-name-text");

		// All available match and line odds
		const allOddsIncludingLines = document.querySelectorAll(".animate-odd");

		// Removes lines odds
		let oddsDataExcludingLines = [];
		if (allOddsIncludingLines.length > allGames.length * 2) {
			let skipCount = 0;
			for (let i = 1; i < allOddsIncludingLines.length; i++) {
				if (skipCount === 0) {
					oddsDataExcludingLines.push(
						allOddsIncludingLines[i].innerHTML,
						allOddsIncludingLines[i + 1].innerHTML
					);
					skipCount = 3;
				} else {
					skipCount--;
				}
			}
		} else {
			allOddsIncludingLines.forEach((odds) =>
				oddsDataExcludingLines.push(odds.innerHTML)
			);
		}

		// Inserts all teams playing into array
		const teamsPlaying = [];
		for (let i = 0; i < allGames.length; i++) {
			teamsPlaying.push(allGames[i].innerText);
		}

		// Seperates teams into their own property and inserts all data into list of games
		let j = 0;
		for (let i = 0; i < teamsPlaying.length; i++) {
			const [firstTeam, secondTeam] = teamsPlaying[i].split(" v ");
			const gameData = {
				bookie: "Tab",
				firstTeam: firstTeam,
				secondTeam: secondTeam,
				firstTeamOdds: oddsDataExcludingLines[j],
				secondTeamOdds: oddsDataExcludingLines[j + 1],
			};
			j += 2;
			gamesList.push(gameData);
		}

		return gamesList;
	});

	await browser.close();
	return teamsAndOdds;
}

module.exports = { tab };
