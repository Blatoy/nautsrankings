var SearchView = new function() {
  var self = this;
  var preventAdvancedSearchHide = false;  // Set to true when entering the as-search div

  // Hide search-box, add leagues and naut icons and add event listener
  this.init = function() {
    this.setSearchBoxDisplay(false);
    this.addLeagueIconsToSearch();
    this.addNautIconsToSearch();
    this.addCountryFlagsToSearch();
    this.addEvents();
    this.updateSearchParametersFromURL();
  }

  // Add events related to the search
  this.addEvents = function() {
    // Reset everything on logo click
    $("#logo, #search-box-reset").on("click", function() {
      LeaderboardView.setLoadingDisplay(true);
      LeaderboardView.clearTable();
      SearchController.reset();
      self.reset();
      setURLData("");
      SearchController.getPlayersFromAPI(function() {
        LeaderboardView.setLoadingDisplay(false);
      });
    });

    // Display search on input focus, and "+" click
    $("#search-username, #display-search-box").on("focusin click", function() {
      self.setSearchBoxDisplay(true);
    });

    // Close on black background click or close button press
    $("#search-box-background, #search-box-close").on("click", function(){
      self.setSearchBoxDisplay(false)
    });

    // Search when pressing enter in input or search button press
    $("#search-box-search").on("click", search);
    $("#search-username").on("keydown", function(e){
      if(e.keyCode == 13) {
        search();
      }
    });
  };

  var search = function() {
    self.setSearchBoxDisplay(false);
    var nautsIds = [], leagueIds = [];

    // Get selected nauts
    $("#search-naut-list .selected").each(function() {
      nautsIds.push($(this).data("naut-id"));
    });

    // Get selected leagues
    $("#search-league-list .selected").each(function() {
      leagueIds.push($(this).data("league-id"));
    });

    // Notify the controller to use custom search
    SearchController.setUseSearch(true);
    // Update all search parameters
    SearchController.updateSearchParameters({
      "username": $("#search-username").val(),
      "nautsIds": nautsIds,
      "leagueIds": leagueIds,
      "sortBy": $("#search-sort-type").val(),
      "sortOrder": $("#search-sorting-order").val(),
      "country": $("#search-country").val()
    });

    self.setURL(SearchController.getSearchParameters());

    // "Loading mode"
    LeaderboardView.clearTable();
    LeaderboardView.setLoadingDisplay(true);
    LeaderboardView.setNoResultDisplay(false);
    // Reset current page number and query API
    SearchController.resetPageNumber();
    SearchController.getPlayersFromAPI(function() {
      LeaderboardView.setLoadingDisplay(false);
    });
  };

  this.setURL = function(searchParameters) {
    // URL Format is: nautID-nautID-nautID/leagues/sortByIndex/sortOrderIndex/username
      var url =   searchParameters.nautsIds.join("-") + "/";
      url     +=  searchParameters.leagueIds.join("") + "/";
      url     +=  searchParameters.sortBy             + "/";
      url     +=  searchParameters.sortOrder          + "/";
      url     +=  encodeURIComponent(searchParameters.username) + "/";
      url     +=  (searchParameters.country) + "/";
      setURLData(url);
  };

  this.updateSearchParametersFromURL = function() {
    var urlData = getURLData();
    if(!urlData) return;

    // format: nautid-nautid-nautid/leagues/sortType/sortOrder/usernameEncoded
    urlData = urlData.split("/");
    urlData[0] = urlData[0].split("-");
    $("#search-naut-list .naut-icon").each(function(){
      for(var i = 0; i < urlData[0].length; ++i) {
        if($(this).data("naut-id") == urlData[0][i]) {
          $(this).addClass("selected");
          break;
        }
      }
    });

    $("#search-league-list .league-icon").each(function(){
      for(var i = 0; i < urlData[1].length; ++i) {
        if($(this).data("league-id") == urlData[1][i]) {
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
  };

  // Add leagues icon to the search-box
  this.addLeagueIconsToSearch = function() {
    for(var i = 1; i < 10; ++i) {
      (function(i){
        $("#search-league-list").append(
          $("<img>")
            .attr("src", PATH.IMAGES + "leagues/UI_League" + i + ".png").addClass("league-icon").data("league-id", i)
            .on("click", function(){
              $(this).toggleClass("selected");
            })
        );
      })(i);
    }
  };

  // Add nauts icon to the search-box
  this.addNautIconsToSearch = function() {
    // Add all nauts to the awesomenauts search
    for(var i = 0; i < NAUTS.length; ++i) {
      var naut = NAUTS[i];
      if(!naut.hide) {
        (function(i){
          $("#search-naut-list").append(
            $("<img>")
              .attr("src", PATH.IMAGES + "/nauts-icon/Classicon_" + naut.className + ".png").addClass("naut-icon").data("naut-id", i)
              .on("click", function(){
                $(this).toggleClass("selected");
              })
          );
        })(i, naut);
      }
    }
  };

  // Add countries to select box
  this.addCountryFlagsToSearch = function() {
    // Add all nauts to the awesomenauts search
    for(var k in COUNTRY_CODE_TO_NAME) {
      $("#search-country").append("<option value='" + k + "'>" + COUNTRY_CODE_TO_NAME[k] + "</option>");
    }
  };

  // Toggle search box display
  this.setSearchBoxDisplay = function(display) {
    setElementVisibility("#search-box", display);
    setElementVisibility("#search-box-background", display);
  }

  // Reset search display to its default values
  this.reset = function(){
    $(".selected").removeClass("selected");
    $("#search-username").val("");
  };
};
