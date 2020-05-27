window.nautsRankings = {};

nautsRankings.config = {
    API_URL: "https://orikaru.net/resources/logic/php/ajax/nautsranking.php",
    STEAM_PROFILE_URL: "http://steamcommunity.com/profiles/",
    IMAGE_PATH: "/standalone/nautsrankings/images/"
};

nautsRankings.config.NAUTS = [
    {className: "Unknown", name: "Unknown (NautsRankings outdated?)", hide: true}, // Defaults to id 0 if the nauts doesn't exists
    {className: "Dasher", name: "Froggy"},
    {className: "Cowboy", name: "Lonestar"},
    {className: "Summoner", name: "Voltar"},
    {className: "Jetter", name: "Yuri"},
    {className: "Chameleon", name: "Leon"},
    {className: "Tank", name: "Clunk"},
    {className: "Heavy", name: "Derpl"},
    {className: "Blazer", name: "Coco"},
    {className: "Brute", name: "Skolldir"},
    {className: "Crawler", name: "Ksenia"},
    {className: "Hunter", name: "Raelynn"},
    {className: "Maw", name: "Gnaw"},
    {className: "Wozzle", name: "Rocco"},
    {className: "Vampire", name: "Ayla"},
    {className: "Unknown", name: "Unknown ?", hide: true}, // Unused ID
    {className: "Bird", name: "Vinnie"},
    {className: "None", name: "Disconnected before playing one game", hide: false}, // When players leave a match before playing any game
    {className: "Butterfly", name: "Genji"},
    {className: "Assassin", name: "Penny"},
    {className: "Captain", name: "Swiggins"},
    {className: "Commando", name: "Ted"},
    {className: "Spy", name: "Sentry"},
    {className: "Shaman", name: "Skree"},
    {className: "Paladin", name: "Scoop"},
    {className: "Blinker", name: "Nibbs"},
    {className: "Ellipto", name: "Yoolip"},
    {className: "Hyper", name: "Chucho"},
    {className: "Shifter", name: "Ix"},
    {className: "Warrior", name: "LUX"},
    {className: "Poacher", name: "Smiles"},
    {className: "Rascal", name: "Dizzy"},
    {className: "Boizor", name: "Max"},
    {className: "Crumple", name: "Deadlift"},
    {className: "Wakuwaku", name: "CMDR. Rocket."},
    {className: "Gantlet", name: "Qi'tara"},
    {className: "Gladiator", name: "Snork Gunk"}
];

nautsRankings.config.LEAGUES_FACTORS = [
    0.015, // Note: L1 is limited to 250
    0.03,
    0.08,
    0.13,
    0.235,
    0.34,
    0.474,
    0.6785
];

// Source: https://gist.githubusercontent.com/keeguon/2310008/raw/bdc2ce1c1e3f28f9cab5b4393c7549f38361be4e/countries.json
nautsRankings.config.COUNTRY_CODE_TO_NAME = {"AF":"Afghanistan", "AX":"Åland Islands", "AL":"Albania", "DZ":"Algeria", "AS":"American Samoa", "AD":"AndorrA", "AO":"Angola", "AI":"Anguilla", "AQ":"Antarctica", "AG":"Antigua and Barbuda", "AR":"Argentina", "AM":"Armenia", "AW":"Aruba", "AU":"Australia", "AT":"Austria", "AZ":"Azerbaijan", "BS":"Bahamas", "BH":"Bahrain", "BD":"Bangladesh", "BB":"Barbados", "BY":"Belarus", "BE":"Belgium", "BZ":"Belize", "BJ":"Benin", "BM":"Bermuda", "BT":"Bhutan", "BO":"Bolivia", "BA":"Bosnia and Herzegovina", "BW":"Botswana", "BV":"Bouvet Island", "BR":"Brazil", "IO":"British Indian Ocean Territory", "BN":"Brunei Darussalam", "BG":"Bulgaria", "BF":"Burkina Faso", "BI":"Burundi", "KH":"Cambodia", "CM":"Cameroon", "CA":"Canada", "CV":"Cape Verde", "KY":"Cayman Islands", "CF":"Central African Republic", "TD":"Chad", "CL":"Chile", "CN":"China", "CX":"Christmas Island", "CC":"Cocos (Keeling) Islands", "CO":"Colombia", "KM":"Comoros", "CG":"Congo", "CD":"Congo, The Democratic Republic of the", "CK":"Cook Islands", "CR":"Costa Rica", "CI":"Cote D'Ivoire", "HR":"Croatia", "CU":"Cuba", "CY":"Cyprus", "CZ":"Czech Republic", "DK":"Denmark", "DJ":"Djibouti", "DM":"Dominica", "DO":"Dominican Republic", "EC":"Ecuador", "EG":"Egypt", "SV":"El Salvador", "GQ":"Equatorial Guinea", "ER":"Eritrea", "EE":"Estonia", "ET":"Ethiopia", "FK":"Falkland Islands (Malvinas)", "FO":"Faroe Islands", "FJ":"Fiji", "FI":"Finland", "FR":"France", "GF":"French Guiana", "PF":"French Polynesia", "TF":"French Southern Territories", "GA":"Gabon", "GM":"Gambia", "GE":"Georgia", "DE":"Germany", "GH":"Ghana", "GI":"Gibraltar", "GR":"Greece", "GL":"Greenland", "GD":"Grenada", "GP":"Guadeloupe", "GU":"Guam", "GT":"Guatemala", "GG":"Guernsey", "GN":"Guinea", "GW":"Guinea-Bissau", "GY":"Guyana", "HT":"Haiti", "HM":"Heard Island and Mcdonald Islands", "VA":"Holy See (Vatican City State)", "HN":"Honduras", "HK":"Hong Kong", "HU":"Hungary", "IS":"Iceland", "IN":"India", "ID":"Indonesia", "IR":"Iran, Islamic Republic Of", "IQ":"Iraq", "IE":"Ireland", "IM":"Isle of Man", "IL":"Israel", "IT":"Italy", "JM":"Jamaica", "JP":"Japan", "JE":"Jersey", "JO":"Jordan", "KZ":"Kazakhstan", "KE":"Kenya", "KI":"Kiribati", "KP":"Korea, Democratic People'S Republic of", "KR":"Korea, Republic of", "KW":"Kuwait", "KG":"Kyrgyzstan", "LA":"Lao People'S Democratic Republic", "LV":"Latvia", "LB":"Lebanon", "LS":"Lesotho", "LR":"Liberia", "LY":"Libyan Arab Jamahiriya", "LI":"Liechtenstein", "LT":"Lithuania", "LU":"Luxembourg", "MO":"Macao", "MK":"Macedonia, The Former Yugoslav Republic of", "MG":"Madagascar", "MW":"Malawi", "MY":"Malaysia", "MV":"Maldives", "ML":"Mali", "MT":"Malta", "MH":"Marshall Islands", "MQ":"Martinique", "MR":"Mauritania", "MU":"Mauritius", "YT":"Mayotte", "MX":"Mexico", "FM":"Micronesia, Federated States of", "MD":"Moldova, Republic of", "MC":"Monaco", "MN":"Mongolia", "MS":"Montserrat", "MA":"Morocco", "MZ":"Mozambique", "MM":"Myanmar", "NA":"Namibia", "NR":"Nauru", "NP":"Nepal", "NL":"Netherlands", "AN":"Netherlands Antilles", "NC":"New Caledonia", "NZ":"New Zealand", "NI":"Nicaragua", "NE":"Niger", "NG":"Nigeria", "NU":"Niue", "NF":"Norfolk Island", "MP":"Northern Mariana Islands", "NO":"Norway", "OM":"Oman", "PK":"Pakistan", "PW":"Palau", "PS":"Palestinian Territory, Occupied", "PA":"Panama", "PG":"Papua New Guinea", "PY":"Paraguay", "PE":"Peru", "PH":"Philippines", "PN":"Pitcairn", "PL":"Poland", "PT":"Portugal", "PR":"Puerto Rico", "QA":"Qatar", "RE":"Reunion", "RO":"Romania", "RU":"Russian Federation", "RW":"RWANDA", "SH":"Saint Helena", "KN":"Saint Kitts and Nevis", "LC":"Saint Lucia", "PM":"Saint Pierre and Miquelon", "VC":"Saint Vincent and the Grenadines", "WS":"Samoa", "SM":"San Marino", "ST":"Sao Tome and Principe", "SA":"Saudi Arabia", "SN":"Senegal", "CS":"Serbia and Montenegro", "SC":"Seychelles", "SL":"Sierra Leone", "SG":"Singapore", "SK":"Slovakia", "SI":"Slovenia", "SB":"Solomon Islands", "SO":"Somalia", "ZA":"South Africa", "GS":"South Georgia and the South Sandwich Islands", "ES":"Spain", "LK":"Sri Lanka", "SD":"Sudan", "SR":"Suriname", "SJ":"Svalbard and Jan Mayen", "SZ":"Swaziland", "SE":"Sweden", "CH":"Switzerland", "SY":"Syrian Arab Republic", "TW":"Taiwan, Province of China", "TJ":"Tajikistan", "TZ":"Tanzania, United Republic of", "TH":"Thailand", "TL":"Timor-Leste", "TG":"Togo", "TK":"Tokelau", "TO":"Tonga", "TT":"Trinidad and Tobago", "TN":"Tunisia", "TR":"Turkey", "TM":"Turkmenistan", "TC":"Turks and Caicos Islands", "TV":"Tuvalu", "UG":"Uganda", "UA":"Ukraine", "AE":"United Arab Emirates", "GB":"United Kingdom", "US":"United States", "UM":"United States Minor Outlying Islands", "UY":"Uruguay", "UZ":"Uzbekistan", "VU":"Vanuatu", "VE":"Venezuela", "VN":"Viet Nam", "VG":"Virgin Islands, British", "VI":"Virgin Islands, U.S.", "WF":"Wallis and Futuna", "EH":"Western Sahara", "YE":"Yemen", "ZM":"Zambia", "ZW":"Zimbabwe"};
