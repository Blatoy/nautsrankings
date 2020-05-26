nautsRankings.Utils = class {
    /**
     * @param {number} rank 
     * @returns league number (1 to 9) for the given player rank
     */
    static getLeagueNumberFromRank(rank, totalPlayerCount) {
        const LEAGUES_FACTORS = nautsRankings.config.LEAGUES_FACTORS;
        let leagueIndex = 0;
        let playerCountInPreviousLeagues = 0;


        while (rank > playerCountInPreviousLeagues && leagueIndex < LEAGUES_FACTORS.length) {
            playerCountInPreviousLeagues += LEAGUES_FACTORS[leagueIndex] * totalPlayerCount;
            leagueIndex++;
        }

        // Max 250 players in league 1
        if (leagueIndex === 1 && rank > 250) {
            return 2;
        } else {
            return leagueIndex;
        }
    }

    static queryAPI(action, params) {
        return new Promise((resolve) => {
            $.get(nautsRankings.config.API_URL, { action: action, params: params }, resolve, "json");
        });
    }

    // Source: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
    static escapeHTML(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    static secondsToReadableTime(seconds) {
        const minutes = Math.floor((seconds / 60) % 60);
        const hours = Math.floor((seconds / 3600) % 24);
        const days = Math.floor(seconds / 86400);
        let readableTime = "";

        if (minutes + hours + days === 0) {
            readableTime = "just now";
        } else {
            readableTime += (days > 0) ? (days + " days ") : "";
            readableTime += (hours > 0) ? (hours + " hours ") : "";
            readableTime += (minutes > 0) ? (minutes + " minutes") : "";
            readableTime += " ago";
        }

        return readableTime;
    }
};


function setElementVisibility(selector, visibility) {
    if (visibility) {
        $(selector).show();
    } else {
        $(selector).hide();
    }
}


function getURLData() {
    if (window.location.href.includes("#")) {
        return window.location.href.split("#")[1];
    }

    return false;
}

