const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function tab(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`https://www.tab.com.au/sports/betting/${sport}`, {
		waitUntil: "networkidle2",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];
		// All game cards
		const gameCards = document.querySelectorAll(".template-item");

		gameCards.forEach((game) => {
			// If game is live skip it without scraping its data
			if (game.querySelector(".meta-data-item.in-play")) return;

			// All team names and odds within each card
			const teams = game.querySelectorAll(".match-name-text");

			const odds = game.querySelectorAll(".animate-odd");

			const [firstTeam, secondTeam] = teams[0].innerText.split(" v ");

			const gamesData = {
				bookie: "Tab",
				firstTeam: firstTeam,
				secondTeam: secondTeam,
				firstTeamOdds: odds[1].innerText,
				secondTeamOdds: odds[2].innerText,
			};

			gamesList.push(gamesData);
		});

		return gamesList;
	});

	await browser.close();
	return teamAndOdds;
}

module.exports = { tab };
