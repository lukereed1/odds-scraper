const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function unibet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(
		`https://www.unibet.com.au/betting/sports/filter/${sport}/all/matches`,
		{
			waitUntil: "networkidle0",
		}
	);

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(".c21a2");

		gameCards.forEach((game) => {
			// If game is live skip it without scraping its data
			if (game.querySelector("._026a0._868eb.fe33e")) return;

			// All team names and odds within each card
			const teams = game.querySelectorAll(".c539a");

			const odds = game.querySelectorAll("._8e013");

			const gamesData = {
				bookie: "Unibet",
				firstTeam: teams[0].innerText,
				secondTeam: teams[1].innerText,
				firstTeamOdds: odds[0].innerText,
				secondTeamOdds: odds[1].innerText,
			};

			gamesList.push(gamesData);
		});

		return gamesList;
	});

	await browser.close();
	return teamAndOdds;
}

async function unibetSoccer(league) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(
		`https://www.unibet.com.au/betting/sports/filter/football/${league}/all/matches`,
		{
			waitUntil: "networkidle0",
		}
	);

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(".c21a2");

		gameCards.forEach((game) => {
			// If game is live skip it without scraping its data
			if (game.querySelector("._026a0._868eb.fe33e")) return;

			// All team names and odds within each card
			const teams = game.querySelectorAll(".c539a");

			const odds = game.querySelectorAll("._8e013");

			const gamesData = {
				bookie: "Unibet",
				firstTeam: teams[0].innerText,
				secondTeam: teams[1].innerText,
				firstTeamOdds: odds[0].innerText,
				drawOdds: odds[1].innerText,
				secondTeamOdds: odds[2].innerText,
			};

			gamesList.push(gamesData);
		});

		return gamesList;
	});

	await browser.close();
	return teamAndOdds;
}

module.exports = {
	unibet,
	unibetSoccer,
};
