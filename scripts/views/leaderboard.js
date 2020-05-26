const RELOAD_HEIGHT = 2000;

nautsRankings.LeaderboardView = class {
    constructor() {
        this.setNoResultDisplay(false);
        this._addTableHeaders();
        this._addEvents();
    }

    _addEvents() {
    // Auto-reload page when reaching page bottom
        $("#content-container").on("scroll", () => {
            if ($("#content-container").scrollTop() + $("#content-container").height() > $("#content-container").prop("scrollHeight") - RELOAD_HEIGHT) {
                nautsRankings.searchController.incrementPageNumber();
                nautsRankings.searchController.loadPlayersFromAPI();
            }
        });
    }

    _addTableHeaders() {
        $("#leaderboard").append(
            "<tr>" +
      "<th>Rank</th>" +
      "<th>Username</th>" +
      "<th>Win%</th>" +
      "<th>Played</th>" +
      "<th>Played all time</th>" +
      "<th>Favourite</th>" +
      "<th>Rating</th>" +
      "<th>Country</th>" +
      "</tr>"
        );
    }

    // Clear table content and add headers
    clearTable() {
        $("#leaderboard tr").remove();
        this._addTableHeaders();
    }

    setLoadingDisplay(display) {
        setElementVisibility("#loading", display);
    }

    setNoResultDisplay(display) {
        setElementVisibility("#no-result", display);
    }

    // Add a list of results to the leaderboard
    addResults(results) {
        let tableContent = "";
        for (let i = 0; i < results.length; ++i) {
            const row = results[i];
            const profileURL = nautsRankings.config.STEAM_PROFILE_URL + nautsRankings.Utils.escapeHTML(row.steamId);
            const totalPlayed = parseInt(row.totalLoss + row.totalWin);
            const seasonPlayed = parseInt(row.seasonLoss + row.seasonWin);
            const winRate = (100 * (row.seasonWin / seasonPlayed)).toFixed(2);
            const username = row.username === null ? "<span style=\"color: rgb(255, 40, 40);\">Username not available yet</span>" : nautsRankings.Utils.escapeHTML(row.username);
            const mainNautId = nautsRankings.Utils.escapeHTML(row.mainNautId);
            const rating = row.rating;
            const rank = row.rank;
            const leagueImagePath = nautsRankings.config.IMAGE_PATH + "leagues/UI_League" + nautsRankings.Utils.getLeagueNumberFromRank(row.rank, nautsRankings.playerCount) + ".png";
            const imagePath = nautsRankings.config.IMAGE_PATH + "nauts-icon/Classicon_" + this.getNautFromID(mainNautId).className + ".png";
            let countryCode = nautsRankings.Utils.escapeHTML(row.countryCode);

            // Set country code to flag image if it's set
            if (countryCode && countryCode.length === 2) {
                countryCode = "<img title='" + nautsRankings.config.COUNTRY_CODE_TO_NAME[countryCode] + "' src='" + nautsRankings.config.IMAGE_PATH + "/flags/" + countryCode.toLowerCase() + ".png'/>";
            } else {
                countryCode = "-";
            }

            // Append the text to the table content
            tableContent +=
        "<tr>" +
        "<td><div><img style='float:left;' src='" + leagueImagePath + "'/> " + rank + "</div></td>" +
        "<td><a href='" + profileURL + "' target='_blank'>" + username + "</a></td>" +
        "<td>" + winRate + "%</td>" +
        "<td>" + seasonPlayed + "</td>" +
        "<td>" + totalPlayed + "</td>" +
        "<td><img src='" + imagePath + "'/></td>" +
        "<td>" + rating + "</td>" +
        "<td>" + countryCode + "</td>" +
        "</tr>";
        }

        // Append everything to the table in one time because it's faster
        $("#leaderboard").append(tableContent);
    }

    // Return naut information from its id (see config.js)
    getNautFromID(id) {
        const naut = nautsRankings.config.NAUTS[id];
        if (naut === undefined) {
            return nautsRankings.config.NAUTS[0];
        } else {
            return naut;
        }
    }
};
