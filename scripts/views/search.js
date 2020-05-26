nautsRankings.SearchView = class {
    constructor() {
        this.hideSearchBox();
        this.addLeagueIconsToSearch();
        this.addNautIconsToSearch();
        this.addCountryFlagsToSearch();
        this.addEvents();
        this.parseSearchParametersFromURL();
        this._searchChanged = false;
    }

    addEvents() {
    // Reset everything on logo click
        $("#logo, #search-box-reset").on("click", () => {
            nautsRankings.leaderboardView.setLoadingDisplay(true);
            nautsRankings.leaderboardView.clearTable();
            nautsRankings.searchController.reset();
            this.reset();

            nautsRankings.searchController.loadPlayersFromAPI().then(() => {
                nautsRankings.leaderboardView.setLoadingDisplay(false);
            });
        });

        // Display search
        document.getElementById("search-username").addEventListener("focusin", () => {
            this.showSearchBox();
        });
        document.getElementById("display-search-box").addEventListener("click", () => {
            this.showSearchBox();
        });

        // Hide search
        document.getElementById("search-box-close").addEventListener("click", () => {
            this.hideSearchBox();
        });

        // Mark search as dirty if anything is touched
        document.getElementById("search-box").addEventListener("click", () => {
            this._searchChanged = true;
        });

        // Search is trigger in a lot of cases
        document.getElementById("search-box-background").addEventListener("click", () => {
            this.search();
        });
        document.getElementById("search-box-search").addEventListener("click", () => {
            this.search();
        });
        document.getElementById("header").addEventListener("click", (e) => {
            if (e.target.tagName !== "INPUT") {
            this.search(); 
            }
        });
        document.getElementById("search-username").addEventListener("keydown", (e) => {


            if (e.keyCode === 13) {
                this.search();
            } else if (e.keyCode === 27) {
                this.hideSearchBox();
            } else {
                this._searchChanged = true;
            }
        });
    }

    search() {
        this.hideSearchBox();

        if (!this._searchChanged) {
            return;
        }

        this._searchChanged = false;

        const nautsIds = [];
        const leagueIds = [];

        // Get selected nauts
        $("#search-naut-list .selected").each(function () {
            nautsIds.push($(this).data("naut-id"));
        });

        // Get selected leagues
        $("#search-league-list .selected").each(function () {
            leagueIds.push($(this).data("league-id"));
        });

        // Notify the controller to use custom search
        nautsRankings.searchController.usingSearch = true;
        // Update all search parameters
        nautsRankings.searchController.searchParameters = {
            "username": $("#search-username").val(),
            "nautsIds": nautsIds,
            "leagueIds": leagueIds,
            "sortBy": $("#search-sort-type").val(),
            "sortOrder": $("#search-sorting-order").val(),
            "country": $("#search-country").val()
        };

        this.setURL(nautsRankings.searchController.searchParameters);

        // "Loading mode"
        nautsRankings.leaderboardView.clearTable();
        nautsRankings.leaderboardView.setLoadingDisplay(true);
        nautsRankings.leaderboardView.setNoResultDisplay(false);
        // Reset current page number and query API
        nautsRankings.searchController.resetPageNumber();
        nautsRankings.searchController.loadPlayersFromAPI().then(() => {
            nautsRankings.leaderboardView.setLoadingDisplay(false);
        });
    }

    setURL(searchParameters) {
    // URL Format is: nautID-nautID-nautID/leagues/sortByIndex/sortOrderIndex/username
        let hashData = searchParameters.nautsIds.join("-") + "/";
        hashData += searchParameters.leagueIds.join("") + "/";
        hashData += searchParameters.sortBy + "/";
        hashData += searchParameters.sortOrder + "/";
        hashData += encodeURIComponent(searchParameters.username) + "/";
        hashData += (searchParameters.country) + "/";

        location.replace("#" + hashData);
    }

    // Reset search display to its default values
    reset() {
        document.getElementById("search-sort-type").selectedIndex = 0;
        document.getElementById("search-sorting-order").selectedIndex = 0;
        document.getElementById("search-country").selectedIndex = 0;
        document.querySelectorAll(".selected").forEach(e => e.classList.remove("selected"));
        document.getElementById("search-username").value = "";
        location.replace("#");
    }


    parseSearchParametersFromURL() {
        let urlData = getURLData();

        if (typeof (urlData) !== "string") {
            return;
        }

        // format: nautid-nautid-nautid/leagues/sortType/sortOrder/usernameEncoded
        urlData = urlData.split("/");

        if (urlData.length < 6) {
            return;
        }

        urlData[0] = urlData[0].split("-");
        $("#search-naut-list .naut-icon").each(function () {
            for (let i = 0; i < urlData[0].length; ++i) {
                if ($(this).data("naut-id") === urlData[0][i]) {
                    $(this).addClass("selected");
                    break;
                }
            }
        });

        $("#search-league-list .league-icon").each(function () {
            for (let i = 0; i < urlData[1].length; ++i) {
                if ($(this).data("league-id") === urlData[1][i]) {
                    $(this).addClass("selected");
                    break;
                }
            }
        });
        // urlData[0].split("-"),
        //  "leaguesIds"  : urlData[1].split(""),

        $("#search-country").val(urlData[5]);
        $("#search-sort-type").val(urlData[2]);
        $("#search-sorting-order").val(urlData[3]);
        $("#search-username").val(decodeURIComponent(urlData[4]));
    }

    // Add leagues icon to the search-box
    addLeagueIconsToSearch() {
        for (let i = 1; i < 10; ++i) {
            $("#search-league-list").append(
                $("<img>")
                    .attr("src", nautsRankings.config.IMAGE_PATH + "leagues/UI_League" + i + ".png")
                    .addClass("league-icon")
                    .data("league-id", i)
                    .on("click", function () {
                        $(this).toggleClass("selected");
                    })
            );
        }
    }

    // Add countries to select box
    addCountryFlagsToSearch() {
        for (const countryCode in nautsRankings.config.COUNTRY_CODE_TO_NAME) {
            $("#search-country").append("<option value='" + countryCode + "'>" + nautsRankings.config.COUNTRY_CODE_TO_NAME[countryCode] + "</option>");
        }
    }

    // Toggle search box display
    showSearchBox() {
        document.getElementById("search-box").classList.remove("hidden");
        document.getElementById("search-box-background").classList.remove("hidden");
    }

    hideSearchBox() {
        document.getElementById("search-box").classList.add("hidden");
        document.getElementById("search-box-background").classList.add("hidden");
    }


    // Add nauts icon to the search-box
    addNautIconsToSearch() {
    // Add all nauts to the awesomenauts search
        for (let i = 0; i < nautsRankings.config.NAUTS.length; ++i) {
            const naut = nautsRankings.config.NAUTS[i];
            if (!naut.hide) {
                $("#search-naut-list").append(
                    $("<img>")
                        .attr("src", nautsRankings.config.IMAGE_PATH + "/nauts-icon/Classicon_" + naut.className + ".png")
                        .addClass("naut-icon")
                        .data("naut-id", i)
                        .on("click", function () {
                            $(this).toggleClass("selected");
                        })
                );
            }
        }
    }
};