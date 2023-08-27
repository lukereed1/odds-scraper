const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function boombet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`https://www.boombet.com.au/sport-menu/Sport/${sport}`, {
		waitUntil: "networkidle0",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(".listItemWrapper");

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(".teamName.d-block.d-md-flex.pb-1");
			const odds = game.querySelectorAll(".oddsValue.d-block.d-md-flex");

			const gamesData = {
				bookie: "BoomBet",
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

async function boombetSoccer(league) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`https://boombet.com.au/sport-menu/Sport/Soccer/${league}`, {
		waitUntil: "networkidle0",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(".listItemWrapper");

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(".teamName.d-block.d-md-flex.pb-1");
			const odds = game.querySelectorAll(".oddsValue");

			const gamesData = {
				bookie: "BoomBet",
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

module.exports = { boombet, boombetSoccer };
