var LeaderboardView = new function() {
  var self = this;
  var userCount = 0;
  var RELOAD_HEIGHT = 2000;

  // Add table headers, hide no results and add events
  this.init = function(){
    this.setNoResultDisplay(false);
    this.addTableHeaders();
    this.addEvents();
  };

  // I guess this function add events :eyes:
  this.addEvents = function() {
    // Auto-reload page when reaching page bottom
    $("#content-container").on("scroll", function() {
      if($("#content-container").scrollTop() + $("#content-container").height() > $("#content-container").prop("scrollHeight") - RELOAD_HEIGHT) {
        SearchController.incrementPageNumber();
        SearchController.getPlayersFromAPI();
      }
    });
  };

  // Add the first line of the table at the end of it
  this.addTableHeaders = function() {
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
  };

  // Clear table content and add headers
  this.clearTable = function() {
    $("#leaderboard tr").remove();
    self.addTableHeaders();
  };

  // Set loading display...
  this.setLoadingDisplay = function(display) {
    setElementVisibility("#loading", display);
  };

  // Set no result display...
  this.setNoResultDisplay = function(display) {
    setElementVisibility("#no-result", display);
  };

  // Add a list of results to the leaderboard
  this.addResults = function(results) {
    var tableContent = "";
    for(var i = 0; i < results.length; ++i) {
      var row = results[i];
      var profileURL      = STEAM_PROFILE_URL + escapeHTML(row.steamId);
      var totalPlayed     = parseInt(row.totalLoss + row.totalWin);
      var seasonPlayed    = parseInt(row.seasonLoss + row.seasonWin);
      var winRate         = (100 * (row.seasonWin / seasonPlayed)).toFixed(2);
      var username        = row.username === null ? '<span style="color: rgb(255, 40, 40);">Username not available yet</span>' : escapeHTML(row.username);
      var mainNautId      = escapeHTML(row.mainNautId);
      var rating          = escapeHTML(row.rating);
      var rank            = escapeHTML(row.rank);
      var countryCode     = row.countryCode;
      var leagueImagePath = PATH.IMAGES + "leagues/UI_League" + LeaderboardController.getLeagueNumberFromRank(row.rank) + ".png";
      var imagePath       = PATH.IMAGES + "nauts-icon/Classicon_" + NautsRankings.getNautFromID(mainNautId).className + ".png";

      // Set country code to flag image if it's set
      if(countryCode && countryCode.length == 2) {
        countryCode     = "<img title='" + COUNTRY_CODE_TO_NAME[countryCode] + "' src='" + PATH.IMAGES + "/flags/" + countryCode.toLowerCase() + ".png'/>";
      }
      else {
        countryCode     = "-";
      }

      // Append the text to the table content
      tableContent +=
        "<tr>" +
          "<td><div><img style='float:left;' src='" + leagueImagePath +"'/> " + rank + "</div></td>" +
          "<td><a href='" + profileURL + "' target='_blank'>" + username + "</a></td>" +
          "<td>" + winRate + "%</td>" +
          "<td>" + seasonPlayed + "</td>" +
          "<td>" + totalPlayed + "</td>" +
          "<td><img src='" + imagePath +"'/></td>" +
          "<td>" + rating + "</td>" +
          "<td>" + countryCode + "</td>" +
        "</tr>";
      }

      // Append everything to the table in one time because it's faster
      $("#leaderboard").append(tableContent);
  };
};
