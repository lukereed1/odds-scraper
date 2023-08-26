const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

/*--------------------------------------------------------------------*/
/*------------------------Rugby League, AFL---------------------------*/
/*--------------------------------------------------------------------*/
async function sportsbet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`https://www.sportsbet.com.au/betting/${sport}`, {
		waitUntil: "networkidle2",
	});

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];
		// All game cards
		const gameCards = document.querySelectorAll(
			".multiMarketCouponContainer_f234ak7"
		);

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(
				".size14_f7opyze.Endeavour_fhudrb0.medium_f1wf24vo.participantText_fivg86r"
			);

			const oddsColumn = game.querySelector(
				".market-coupon-col-0.gridColumn_frfjtr6"
			);

			const odds = oddsColumn.querySelectorAll(
				".size14_f7opyze.bold_f1au7gae.priceTextSize_frw9zm9"
			);

			const gamesData = {
				bookie: "SportsBet",
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

module.exports = { sportsbet };
