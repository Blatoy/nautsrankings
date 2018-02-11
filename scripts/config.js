var API_URL = "https://orikaru.net/resources/logic/php/ajax/nautsranking.php";
var STEAM_PROFILE_URL = "http://steamcommunity.com/profiles/";

var PATH = {};
PATH.BASE = "/standalone/nautsrankings/";
PATH.IMAGES = PATH.BASE + "images/";

var NAUTS = [
  {"className": "Random",    "name": "Unknown", "hide": true},    // ???
  {"className": "Dasher",    "name": "Froggy"},
  {"className": "Cowboy",    "name": "Lonestar"},
  {"className": "Summoner",  "name": "Voltar"},
  {"className": "Jetter",    "name": "Yuri"},
  {"className": "Chameleon", "name": "Leon"},
  {"className": "Tank",      "name": "Clunk"},
  {"className": "Heavy",     "name": "Derpl"},
  {"className": "Blazer",    "name": "Coco"},
  {"className": "Brute",     "name": "Skolldir"},
  {"className": "Crawler",   "name": "Ksenia"},
  {"className": "Hunter",    "name": "Raelynn"},
  {"className": "Maw",       "name": "Gnaw"},
  {"className": "Wozzle",    "name": "Rocco"},
  {"className": "Vampire",   "name": "Ayla"},
  {"className": "None",      "name": "Disconnect", "hide": true}, // When players leave a match before playing any game
  {"className": "Bird",      "name": "Vinnie"},
  {"className": "17",        "name": "Unknown)", "hide": true},   // Unused ID
  {"className": "Butterfly", "name": "Genji"},
  {"className": "Assassin",  "name": "Penny"},
  {"className": "Captain",   "name": "Swiggins"},
  {"className": "Commando",  "name": "Ted"},
  {"className": "Spy",       "name": "Sentry"},
  {"className": "Shaman",    "name": "Skree"},
  {"className": "Paladin",   "name": "Scoop"},
  {"className": "Blinker",   "name": "Nibbs"},
  {"className": "Ellipto",   "name": "Yoolip"},
  {"className": "Hyper",     "name": "Chucho"},
  {"className": "Shifter",   "name": "Ix"},
  {"className": "Warrior",   "name": "LUX"},
  {"className": "Rascal",    "name": "Dizzy"},
  {"className": "Boizor",    "name": "Max"},
  {"className": "Crumple",   "name": "Deadlift"},
  {"className": "Poacher",   "name": "Smiles"},
  {"className": "Wakuwaku",  "name": "CMDR. Rocket."},
  {"className": "Gantlet",   "name": "Qi'tara"}
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
