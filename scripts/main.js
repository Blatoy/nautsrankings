window.nautsRankings = {};

window.addEventListener("load", () => {
    nautsRankings.searchController = new nautsRankings.SearchController();
    nautsRankings.searchView = new nautsRankings.SearchView();
    nautsRankings.leaderboardView = new nautsRankings.LeaderboardView();
    nautsRankings.playerCount = -1;

    nautsRankings.Utils.queryAPI("get-update-time", false).then((data) => {
        document.getElementById("rank-update-time").textContent = nautsRankings.Utils.secondsToReadableTime(data.result);
    });

    document.getElementById("about-nautsrankings").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("about-nautsrankings").classList.add("hidden");
        document.getElementById("about-update-time").classList.add("hidden");
        document.getElementById("about-desc").classList.remove("hidden");
    });
});
