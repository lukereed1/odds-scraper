const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function pointsbet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`https://pointsbet.com.au/sports/${sport}`, {
		waitUntil: "networkidle0",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(".f3wis39");

		gameCards.forEach((game) => {
			if (game.querySelector(".f18p45g0")) return;

			// All team names and odds within each card
			const teams = game.querySelectorAll(
				".f193t5zp.f1r0ggt8.f1wtz5iq.f1rokedd"
			);

			const odds = game.querySelectorAll(".fheif50");

			const gamesData = {
				bookie: "Pointsbet",
				firstTeam: teams[0].innerText,
				secondTeam: teams[1].innerText,
				firstTeamOdds: odds[0].innerText,
				secondTeamOdds: odds[3].innerText,
			};

			gamesList.push(gamesData);
		});

		return gamesList;
	});

	await browser.close();
	return teamAndOdds;
}

async function pointsbetSoccer(league) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`https://pointsbet.com.au/sports/soccer/${league}`, {
		waitUntil: "networkidle0",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(".f3wis39");

		gameCards.forEach((game) => {
			if (game.querySelector(".f18p45g0")) return;

			// All team names and odds within each card
			const teams = game.querySelectorAll(".fo145k6");
			const [firstTeam, secondTeam] = teams[0].innerText.split(" v ");

			const odds = game.querySelectorAll(".fheif50");

			const gamesData = {
				bookie: "Pointsbet",
				firstTeam: firstTeam,
				secondTeam: secondTeam,
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

module.exports = { pointsbet, pointsbetSoccer };
