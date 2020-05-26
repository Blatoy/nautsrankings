window.nautsRankings = {};

window.addEventListener("load", () => {
    nautsRankings.searchController = new nautsRankings.SearchController();
    nautsRankings.searchView = new nautsRankings.SearchView();
    nautsRankings.leaderboardView = new nautsRankings.LeaderboardView();
    nautsRankings.playerCount = -1;

    nautsRankings.Utils.queryAPI("get-update-time", false).then((data) => {
        $("#rank-update-time").text(nautsRankings.Utils.secondsToReadableTime(data.result));
    // $("#rank-update-time").text("Latest season not available at the moment");
    });
});