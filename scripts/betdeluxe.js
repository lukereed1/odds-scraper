const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function betdeluxe(sportURL) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`${sportURL}`, {
		waitUntil: "networkidle0",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(
			".css-2m31m3-sportsStyles-styled-sportsStyles__ItemContainer-sportsStyles-styled.errtm9l0"
		);

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(
				".css-ggkqa9-sportsStyles-styled-sportsStyles__OuterTitleContainer-sportsStyles-styled.errtm9l20"
			);
			const odds = game.querySelectorAll(
				".errtm9l13.css-16r7ucc-Text-Text-sportsStyles-styled-sportsStyles__OddsText-sportsStyles-styled.ea6hjv30"
			);

			const firstTeamOdds = odds[0].innerText;
			// If line odds are present, match odds are selected via their index
			const secondTeamOdds =
				odds.length > teams.length ? odds[2].innerText : odds[1].innerText;

			const gamesData = {
				bookie: "BetDeluxe",
				firstTeam: teams[0].innerText,
				secondTeam: teams[1].innerText,
				firstTeamOdds: firstTeamOdds,
				secondTeamOdds: secondTeamOdds,
			};

			gamesList.push(gamesData);
		});

		return gamesList;
	});

	await browser.close();
	return teamAndOdds;
}

async function betdeluxeSoccer(league) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`https://betdeluxe.com.au/sports/football/${league}`, {
		waitUntil: "networkidle0",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(
			".css-1a2d4ug-sportsStyles-styled-sportsStyles__SelectionsContainer-sportsStyles-styled.errtm9l18"
		);

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(
				".css-ggkqa9-sportsStyles-styled-sportsStyles__OuterTitleContainer-sportsStyles-styled.errtm9l20"
			);

			const odds = game.querySelectorAll(
				".errtm9l13.css-16r7ucc-Text-Text-sportsStyles-styled-sportsStyles__OddsText-sportsStyles-styled.ea6hjv30"
			);

			const gamesData = {
				bookie: "BetDeluxe",
				firstTeam: teams[0].innerText,
				secondTeam: teams[2].innerText,
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

module.exports = { betdeluxe, betdeluxeSoccer };
