const SEARCH_STATUS = { IDLE: 0, LOADING: 1, LOADED: 2, LOADED_NO_RESULTS: 3 };

// Performs all query to the API
nautsRankings.SearchController = class {
    constructor() {
        this.pageNumber = 0;
        this.searchStatus = SEARCH_STATUS.IDLE;
        this.urlParameters = {};
        this.usingSearch = false;

        // Reset search parameters and display 250 first players
        this.reset();
        this.parseSearchParametersFromURL();
        this.queryPlayerCount();
    }

    /**
     * Get total player count for league calculation
     */
    queryPlayerCount() {
        nautsRankings.Utils.queryAPI("get-user-count", { page: 0 }).then((data) => {
            // Track user count for leagues icon display
            nautsRankings.playerCount = data.result;
            document.getElementById("result-count").textContent = data.result; // TODO: Don't do this in the controller
            // Get 250 first players
            this.loadPlayersFromAPI().then(() => {
                nautsRankings.leaderboardView.hideLoading(false);
            });
        });
    }


    /**
     * Read content after the hash and set search parameters from it
     * format: nautid-nautid-nautid/leagues/sortType/sortOrder/usernameEncoded
     */
    parseSearchParametersFromURL() {
        const urlData = getURLData();
        if (typeof (urlData) !== "string") {
            return;
        }

        const urlParameters = urlData.split("/");
        if (urlParameters.length >= 6) {
            this.searchParameters = {
                nautsIds: urlParameters[0] !== "" ? urlParameters[0].split("-") : [],
                leagueIds: urlParameters[1].split(""),
                sortBy: urlParameters[2],
                sortOrder: urlParameters[3],
                username: decodeURIComponent(urlParameters[4]),
                country: decodeURIComponent(urlParameters[5])
            };

            this.usingSearch = true;
        }
    }

    /**
     * Reset all search parameters
     */
    reset() {
        this.searchParameters = {
            "username": "",
            "nautsIds": [],
            "leagueIds": [],
            "sortBy": "rank",
            "sortOrder": "asc",
            "country": ""
        };

        this.searchStatus = SEARCH_STATUS.IDLE;
        this.usingSearch = false;
        this.pageNumber = 0;
    }

    /**
   * Called before reaching the bottom of the page
   */
    incrementPageNumber() {
        if (this.searchStatus === SEARCH_STATUS.IDLE || this.searchStatus === SEARCH_STATUS.LOADED) {
            this.pageNumber++;
        }
    }

    /**
   * Reset page number and page status to allow new queries 
   */
    resetPageNumber() {
        this.pageNumber = 0;
        this.searchStatus = SEARCH_STATUS.IDLE;
    }

    /**
   * Get a list of all players matching searchParameters and add them to the leadeboard
   */
    loadPlayersFromAPI() {
        return new Promise((resolve) => {
            // Prevent spamming the API for nothing
            if (this.searchStatus !== SEARCH_STATUS.IDLE && this.searchStatus !== SEARCH_STATUS.LOADED) {
                resolve(false);
            } else {
                this.searchStatus = SEARCH_STATUS.LOADING;

                // "get-all" is way faster than searching for nothing
                const action = this.usingSearch ? "search" : "get-all";

                nautsRankings.Utils.queryAPI(action, { page: this.pageNumber, settings: this.searchParameters }).then((data) => {
                    const results = data.result;

                    if (results.length > 0) {
                        this.searchStatus = SEARCH_STATUS.LOADED;
                        // Append results to the leadeboard
                        nautsRankings.leaderboardView.addResults(results);
                        // TODO: Don't do this in the controller
                        if (this.usingSearch) {
                            document.getElementById("result-count").textContent = results.length + (results.length === 250 ? "+" : "");
                        } else {
                            document.getElementById("result-count").textContent = nautsRankings.playerCount;
                        }
                    } else {
                        this.searchStatus = SEARCH_STATUS.LOADED_NO_RESULTS;

                        // Reached the end, prevent news query
                        if (this.pageNumber === 0) {
                            nautsRankings.leaderboardView.showNoResults();
                        }
                    }

                    resolve();
                });
            }
        });
    }
};