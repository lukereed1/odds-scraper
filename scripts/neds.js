const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function neds(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`https://www.neds.com.au/sports/${sport}`, {
		waitUntil: "networkidle2",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(
			".sports-market-primary__prices-inner"
		);

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(".displayTitle");

			const odds = game.querySelectorAll(".price-button-odds-price");

			const gamesData = {
				bookie: "Neds",
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

async function nedsSoccer(league) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`https://www.neds.com.au/sports/soccer/${league}`, {
		waitUntil: "networkidle2",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(
			".sports-market-primary__prices-inner"
		);

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(".displayTitle");

			const odds = game.querySelectorAll(".price-button-odds-price");

			const gamesData = {
				bookie: "Neds",
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

module.exports = { neds, nedsSoccer };
