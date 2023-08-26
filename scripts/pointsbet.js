const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

/*--------------------------------------------------------------------*/
/*------------------------Rugby league and AFL------------------------*/
/*--------------------------------------------------------------------*/
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
		const gameCards = document.querySelectorAll(".fdz3fpy.f1yn18fe.f93i66z");

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(
				".f193t5zp.f1r0ggt8.f1wtz5iq.f1rokedd"
			);

			const odds = game.querySelectorAll(".fheif50");

			const gamesData = {
				bookie: "Neds",
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
	console.log(teamAndOdds);
}

pointsbet("rugby-league/NRL");
module.exports = { pointsbet };
