var API_URL = "https://orikaru.net/resources/logic/php/ajax/nautsranking.php";
var STEAM_PROFILE_URL = "http://steamcommunity.com/profiles/";

var PATH = {};
PATH.BASE = "/standalone/nautsrankings/";
PATH.IMAGES = PATH.BASE + "images/";

    {className: "Unknown", name: "Unknown (NautsRankings outdated?)", hide: true}, // Defaults to id 0 if the nauts doesn't exists
    {className: "None", name: "Disconnect", hide: false}, // When players leave a match before playing any game
    {className: "Unknown", name: "Unknown", hide: true}, // Unused ID ?
];

var LEAGUES_FACTORS = [
  0.015,  // Note: L1 is limited to 250
  0.03,
  0.08,
  0.13,
  0.235,
  0.34,
  0.474,
  0.6785
];
