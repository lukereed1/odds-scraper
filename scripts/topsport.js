const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function topsport(sport) {
	const baseURL = "https://www.topsport.com.au/";
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(120000);
	await page.goto(`${baseURL}`, {
		waitUntil: "networkidle0",
	});

	/* URL is different each week as it's based off round number.
    below finds the URL for the weekly games based on sport chosen*/
	let href;
	if (sport === "rugby-league") {
		href = await page.evaluate(() => {
			const hrefElement = document.querySelector(".icon-RGLE");
			return hrefElement.getAttribute("href");
		});
	} else if (sport === "afl") {
		href = await page.evaluate(() => {
			const hrefElement = document.querySelector(".icon-AFL");
			return hrefElement.getAttribute("href");
		});
	} else if (sport === "mlb") {
		href = "Sport/Baseball/MLB_Match/Matches";
	}
	// Goes to a new page with href and base URL found above
	await page.goto(`${baseURL}${href}`, { waitUntil: "networkidle0" });

	const teamAndOdds = await page.evaluate(() => {
		const gamesList = [];

		// All game cards
		const gameCards = document.querySelectorAll(".framePanel.wc_s_match");

		gameCards.forEach((game) => {
			// All team names and odds within each card
			const teams = game.querySelectorAll(".teamSilkBlock");
			const odds = game.querySelectorAll(".betlink.oddsColumn");

			const firstTeamOdds = odds[0].innerText;
			const secondTeamOdds =
				odds.length < 6 ? odds[2].innerText : odds[3].innerText;

			const gamesData = {
				bookie: "TopSport",
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

module.exports = { topsport };
