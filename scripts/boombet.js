const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

/*--------------------------------------------------------------------*/
/*------------------------Rugby League, AFL---------------------------*/
/*--------------------------------------------------------------------*/
async function boombet() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		`https://www.boombet.com.au/sport-menu/Sport/Australian%20Rules/AFL`,
		{
			waitUntil: "networkidle2",
		}
	);

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];
		// All game cards
		const gameCards = document.querySelectorAll(".listItemWrapper");

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(".teamName.d-block.d-md-flex.pb-1");
			const odds = game.querySelectorAll(".oddsValue.d-block.d-md-flex");

			const gamesData = {
				firstTeam: teams[0].innerText,
				secondTeam: teams[1].innerText,
				firstTeamOdds: odds[0].innerText,
				secondeTeamOdds: odds[1].innerText,
			};

			gamesList.push(gamesData);
		});

		return gamesList;
	});

	return teamAndOdds;
}

module.exports = { boombet };
