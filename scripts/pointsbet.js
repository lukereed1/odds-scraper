const { all } = require("axios");
const puppeteer = require("puppeteer");

async function pointsbet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://pointsbet.com.au/sports/${sport}`, {
		waitUntil: "networkidle2",
	});

	const teamsAndOdds = await page.evaluate(() => {
		const gamesList = [];

		const allGames = document.querySelectorAll(".f2rhni5");

		const allOddsIncludingLines = document.querySelectorAll(".fheif50");

		let oddsDataExcludingLines = [];
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

		for (let i = 0; i < allGames.length; i += 2) {
			const gameData = {
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
