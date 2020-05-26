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

    _resetSearch() {
        nautsRankings.leaderboardView.showLoading();
        nautsRankings.leaderboardView.clearTable();
        nautsRankings.searchController.reset();
        this.reset();

        nautsRankings.searchController.loadPlayersFromAPI().then(() => {
            nautsRankings.leaderboardView.hideLoading(false);
        });
    }

    addEvents() {
        // Reset
        document.getElementById("logo").addEventListener("click", () => {
            this._resetSearch();
        });
        document.getElementById("search-box-reset").addEventListener("click", () => {
            this._resetSearch();
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
            this._searchChanged = true;
            this.search();
        });
        document.getElementById("header").addEventListener("click", (e) => {
            if (e.target.tagName !== "INPUT" && !document.getElementById("search-box").classList.contains("hidden")) {
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
        document.querySelectorAll("#search-naut-list .selected").forEach((e) => {
            nautsIds.push(e.dataset.nautId);
        });

        // Get selected leagues
        document.querySelectorAll("#search-league-list .selected").forEach((e) => {
            leagueIds.push(e.dataset.leagueId);
        });

        // Notify the controller to use custom search
        nautsRankings.searchController.usingSearch = true;
        // Update all search parameters
        nautsRankings.searchController.searchParameters = {
            "username": document.getElementById("search-username").value,
            "nautsIds": nautsIds,
            "leagueIds": leagueIds,
            "sortBy":document.getElementById("search-sort-type").value,
            "sortOrder": document.getElementById("search-sorting-order").value,
            "country": document.getElementById("search-country").value
        };

        this.setURL(nautsRankings.searchController.searchParameters);

        // "Loading mode"
        nautsRankings.leaderboardView.clearTable();
        nautsRankings.leaderboardView.showLoading();
        nautsRankings.leaderboardView.hideNoResults();
        // Reset current page number and query API
        nautsRankings.searchController.resetPageNumber();
        nautsRankings.searchController.loadPlayersFromAPI().then(() => {
            nautsRankings.leaderboardView.hideLoading();
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
        document.querySelectorAll("#search-naut-list .naut-icon").forEach((e) => {
            if (urlData[0].includes(e.dataset.nautId)) {
                e.classList.add("selected");
            }
        });

        document.querySelectorAll("#search-league-list .league-icon").forEach((e) => {
            if (urlData[1].includes(e.dataset.leagueId)) {
                e.classList.add("selected");
            }
        });
        // urlData[0].split("-"),
        //  "leaguesIds"  : urlData[1].split(""),

        document.getElementById("#search-country").value = urlData[5];
        document.getElementById("#search-sort-type").value = urlData[2];
        document.getElementById("#search-sorting-order").value = urlData[3];
        document.getElementById("#search-username").value = decodeURIComponent(urlData[4]);
    }

    // Add leagues icon to the search-box
    addLeagueIconsToSearch() {
        for (let i = 1; i < 10; ++i) {
            const img = new Image();
            img.src = nautsRankings.config.IMAGE_PATH + "leagues/UI_League" + i + ".png";
            img.dataset.leagueId = i;
            img.classList.add("league-icon");
            img.addEventListener("click", () => {
                img.classList.toggle("selected");
            });
            document.getElementById("search-league-list").append(img);
        }
    }

    // Add countries to select box
    addCountryFlagsToSearch() {
        let countryList = "";
        for (const countryCode in nautsRankings.config.COUNTRY_CODE_TO_NAME) {
            countryList += "<option value='" + countryCode + "'>" + nautsRankings.config.COUNTRY_CODE_TO_NAME[countryCode] + "</option>";
        }
        document.getElementById("search-country").innerHTML += countryList;
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
                const img = new Image();
                img.src = nautsRankings.config.IMAGE_PATH + "/nauts-icon/Classicon_" + naut.className + ".png";
                img.classList.add("naut-icon");
                img.dataset.nautId = i;
                img.addEventListener("click", () => {
                    img.classList.toggle("selected");
                });
                document.getElementById("search-naut-list").append(img);
            }
        }
    }
};