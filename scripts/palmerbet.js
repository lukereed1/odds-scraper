const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

/*--------------------------------------------------------------------*/
/*------------------------Rugby League, AFL---------------------------*/
/*--------------------------------------------------------------------*/
async function palmerbet(sportURL) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`${sportURL}`, {
		waitUntil: "networkidle0",
	});
	page.setDefaultTimeout(120000);
	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];
		// All game cards
		const gameCards = document.querySelectorAll(".detail-container");

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(".team-info.team-info--has-logo");
			const odds = game.querySelectorAll(".ng-star-inserted.alt-button-design");

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

module.exports = { palmerbet };
