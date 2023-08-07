const puppeteer = require("puppeteer");

async function sportsbet(sport) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://www.sportsbet.com.au/betting/${sport}`);

	const teamsAndOdds = await page.evaluate(() => {
		const gamesList = [];

		const team1 = document.querySelectorAll(
			"[data-automation-id='participant-one']"
		);

		const team2 = document.querySelectorAll(
			"[data-automation-id='participant-two']"
		);

		const teamsOdds = document.querySelectorAll(
			"[data-automation-id='price-text']"
		);

		for (let i = 0; i < team1.length; i++) {
			const gamesData = {
				firstTeam: team1[i].innerHTML,
				secondTeam: team2[i].innerHTML,
			};

			gamesList.push(gamesData);
		}

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

	console.log(teamsAndOdds);

	await browser.close();
}

sportsbet("australian-rules/afl");
