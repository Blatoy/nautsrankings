var LeaderboardController = new function() {
  this.getLeagueNumberFromRank = function(rank) {
    if(rank < 251) return 1;

    // We ignore league 1 since it's "handled" above. This means this won't work if there's less than 250 players
    for(var i = 1; i < LEAGUES_FACTORS.length; ++i) {
      if(rank < LEAGUES_FACTORS[i] * NautsRankings.playerCount) {
        return i + 1;
      }
    }

    return 9;
  };
};
