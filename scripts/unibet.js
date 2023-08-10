const puppeteer = require("puppeteer");

async function unibet() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		"https://www.unibet.com.au/betting/sports/filter/rugby_league/nrl/all/matches"
	);

	const teamAndOdds = await page.evaluate(() => {
		let gamesList = [];

		const allGames = document.querySelectorAll(".c539a");
		const allOdds = document.querySelectorAll("._8e013");

		// All team names
		let allTeams = [];
		for (let i = 0; i < allGames.length; i++)
			allTeams.push(allGames[i].innerHTML);

		// Removes duplicate teams
		allTeams = allTeams.filter((value, index) => {
			const _value = JSON.stringify(value);
			return (
				index ===
				allTeams.findIndex((obj) => {
					return JSON.stringify(obj) === _value;
				})
			);
		});

		// Groups teams playing each other into objects
		for (let i = 0; i < allTeams.length; i += 2) {
			gameData = {
				firstTeam: allTeams[i],
				secondTeam: allTeams[i + 1],
			};
			gamesList.push(gameData);
		}

		const test = [];
		for (let i = 0; i < allOdds.length; i++) {
			test.push(allOdds[i].innerHTML);
		}

		return test;
	});

	console.log(teamAndOdds);
}

console.log("testing");
unibet();
