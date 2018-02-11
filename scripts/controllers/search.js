// Performs all query to the API
var SearchController = new function() {
  var self = this;
  var SEARCH_STATUS = {IDLE: 0, LOADING: 1, LOADED: 2, LOADED_NO_RESULTS: 3};

  var pageNumber = 0, searchStatus = 0;
  var searchParameters = {};
  var useSearch = false;

  // Reset search parameters and display 250 first players
  this.init = function() {
    this.reset();
    // Get total player count for league calculation
    queryAPI("get-user-count", {page: 0}, function(data) {
      // Track user count for leagues icon display
      userCount = data.result;
      // Get 250 first players
      self.getPlayersFromAPI(function(){
        LeaderboardView.setLoadingDisplay(false);
      });
    });
  };

  // Reset search parameters
  this.reset = function() {
    searchParameters = {
      "username": "",
      "nautsIds": [],
      "leagueIds": [],
      "sortBy": "rank",
      "sortOrder": "asc"
    };

    userSearch = false;
    preventAPIQuery = false;
    pageNumber = 0, searchStatus = SEARCH_STATUS.IDLE;
  };

  // Called before reaching the bottom of the page
  this.incrementPageNumber = function() {
    if(searchStatus == SEARCH_STATUS.IDLE  || searchStatus == SEARCH_STATUS.LOADED) {
        pageNumber++;
    }
  };

  // Reset page number and page status to allow new queries
  this.resetPageNumber = function() {
    pageNumber = 0;
    searchStatus = SEARCH_STATUS.IDLE;
  };

  // Set searchParameters
  this.updateSearchParameters = function(searchParameters_) {
    // Only update specified parameters
    for(var k in searchParameters_) {
      searchParameters[k] = searchParameters_[k];
    }
  };

  // Get a list of all players matching searchParameters and add them to the leadeboard
  this.getPlayersFromAPI = function(callback) {
    // Prevent spamming the API for nothing
    if(searchStatus != SEARCH_STATUS.IDLE && searchStatus != SEARCH_STATUS.LOADED) {
      return;
    }

    // "Loading mode"
    searchStatus = SEARCH_STATUS.LOADING;

    // "get-all" is way faster than search
    var action = useSearch ? "search" : "get-all";

    queryAPI(action, {page: pageNumber, settings: searchParameters}, function(data){
      handleAPIResults(data.result);
      if(callback !== undefined) callback();
    });
  };

  // When useSearch is set to false, use "get-all" and effectively prevent to make any query
  this.setUseSearch = function(useSearch_) {
    useSearch = useSearch_;
  };

  // Display result / no results
  var handleAPIResults = function(results) {
    if(results.length > 0) {
      // Append results to the leadeboard
      searchStatus = SEARCH_STATUS.LOADED;
      LeaderboardView.addResults(results);
    }
    else {
      // Reached the end, prevent news query
      if(pageNumber == 0) {
        LeaderboardView.setNoResultDisplay(true);
      }
      searchStatus = SEARCH_STATUS.LOADED_NO_RESULTS;
    }
  };
}
