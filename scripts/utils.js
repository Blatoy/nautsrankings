nautsRankings.leagueBoundaries = [];
nautsRankings.Utils = class {
    static computeLeaguesBoundaries(totalPlayerCount) {
        const LEAGUES_FACTORS = nautsRankings.config.LEAGUES_FACTORS;

        nautsRankings.leagueBoundaries = [];
        for (let i = 0; i < LEAGUES_FACTORS.length; i++) {
            nautsRankings.leagueBoundaries.push(LEAGUES_FACTORS[i] * totalPlayerCount);
        }

        // L1 is limited to 250
        nautsRankings.leagueBoundaries[0] = Math.min(250, nautsRankings.leagueBoundaries[0]);
    }

    /**
     * @param {number} rank 
     */
    static getLeagueNumberFromRank(rank) {
        let leagueIndex = 0;

        // We could go reverse since statistically there are more L9, but L1 is what is loaded first
        while (rank > nautsRankings.leagueBoundaries[leagueIndex]) {
            leagueIndex++;
        }

        return leagueIndex + 1;
    }

    static async queryAPI(action, params) {
        let url = nautsRankings.config.API_URL;
        
        let urlParams = "";
        for (const k in params) {
            if (typeof params[k] === "object") {
                // TODO: Write recursive function OR just pass using body and fix php api
                for (const i in params[k]) {
                    if (Array.isArray(params[k][i])) {
                        for (let j = 0; j < params[k][i].length; j++) {
                            const value = params[k][i][j];
                            if (value !== undefined && value !== "") {
                                urlParams += encodeURI("&params[" + k + "][" + i + "][]=" + value);
                            }
                        }
                    } else {
                        if (params[k][i] !== undefined && params[k][i] !== "") {
                            urlParams += encodeURI("&params[" + k + "][" + i + "]=" + params[k][i]);
                        }
                    }
                }
            } else {
                if (params[k] !== undefined && params[k] !== "") {
                    urlParams += encodeURI("&params[" + k + "]=" + params[k]);
                }
            }
        }

        const request = {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
        };

        url += "?action=" + action + urlParams;

        const response = await fetch(url, request);
        return await response.json();
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

function getURLData() {
    if (window.location.href.includes("#")) {
        return window.location.href.split("#")[1];
    }

    return false;
}

