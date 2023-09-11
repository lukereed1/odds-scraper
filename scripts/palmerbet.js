const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function palmerbet(sportURL) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`${sportURL}`, {
		waitUntil: "networkidle0",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(".detail-container");

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(".team-info.team-info--has-logo");

			const odds = game.querySelectorAll(".ng-star-inserted.alt-button-design");

			if (odds.length === 0) return;

			const gamesData = {
				bookie: "PalmerBet",
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

async function palmerbetSoccer(sportURL) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`${sportURL}`, {
		waitUntil: "networkidle0",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(".detail-container");

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(".team-info.team-info--has-logo");

			const odds = game.querySelectorAll(
				".additional-button-design.ng-star-inserted"
			);

			const gamesData = {
				bookie: "PalmerBet",
				firstTeam: teams[0].innerText,
				secondTeam: teams[1].innerText,
				firstTeamOdds: odds[0].innerText.split("\n")[1],
				drawOdds: odds[2].innerText.split("\n")[1],
				secondTeamOdds: odds[1].innerText.split("\n")[1],
			};

			gamesList.push(gamesData);
		});

		return gamesList;
	});

	await browser.close();
	return teamAndOdds;
}

module.exports = { palmerbet, palmerbetSoccer };
