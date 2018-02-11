// "Entry point" of the program, init views and controllers
var NautsRankings = new function() {
  var self = this;

  this.init = function() {
    // Get and display the last rank update time
    queryAPI("get-update-time", false, function(data) {
      $("#rank-update-time").text(secondsToReadableTime(data.result) + " ago");
    });

    SearchController.init();
    SearchView.init();
    LeaderboardView.init();
  };

  // Return naut information from its id (see config.js)
  this.getNautFromID = function(id) {
    return NAUTS[id] ? NAUTS[id] : NAUTS[0];
  };
};

NautsRankings.init();
