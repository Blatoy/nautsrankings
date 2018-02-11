var SearchView = new function() {
  var self = this;
  var preventAdvancedSearchHide = false;  // Set to true when entering the as-search div

  // Hide search-box, add leagues and naut icons and add event listener
  this.init = function() {
    this.setSearchBoxDisplay(false);
    this.addLeagueIconsToSearch();
    this.addNautIconsToSearch();
    this.addEvents();
  }

  // Add events related to the search
  this.addEvents = function() {
    // Reset everything on logo click
    $("#logo").on("click", function() {
      LeaderboardView.setLoadingDisplay(true);
      LeaderboardView.clearTable();
      SearchController.reset();
      self.reset();
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
      "sortOrder": $("#search-sorting-order").val()
    });

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
