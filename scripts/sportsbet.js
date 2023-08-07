const puppeteer = require("puppeteer");

async function sportsbet() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.sportsbet.com.au/betting/australian-rules/afl");

	const teamsPlayingWithOdds = await page.evaluate(() => {
		const teams = document.querySelectorAll(
			".multiMarketCouponContainer_f234ak7"
		);

		const teamsOdds = document.querySelectorAll(
			"[data-automation-id='price-text']"
		);

		const gamesList = [];

		teams.forEach((game) => {
			const firstTeam = game.querySelector(
				"[data-automation-id='participant-one']"
			);
			const secondTeam = game.querySelector(
				"[data-automation-id='participant-two']"
			);

			const gameData = {
				firstTeam: firstTeam.textContent,
				secondTeam: secondTeam.textContent,
			};
			gamesList.push(gameData);
		});

		let oddsData = [];
		let skipCount = 0;
		for (let i = 0; i < teamsOdds.length; i++) {
			if (skipCount === 0) {
				oddsData.push(teamsOdds[i].innerHTML, teamsOdds[i + 1].innerHTML);
				skipCount = 5;
			} else {
				skipCount--;
			}
		}
		let j = 0;
		for (let i = 0; i < gamesList.length; i++) {
			gamesList[i].firstTeamOdds = oddsData[j];
			gamesList[i].secondTeamOdds = oddsData[j + 1];
			j += 2;
		}

		return gamesList;
	});

	console.log(teamsPlayingWithOdds);

	await browser.close();
}

sportsbet();
