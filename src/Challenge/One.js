const Replay = require("../Domain/Match/Replay");
const Common = require('../common')

/**
* 
* ~ The last FOUR ~
* 
* ------------------------------------------------------------------
* 
* It's the last 4 overs of the match. Lengaburu needs 40 runs to win
* and with 3 wickets left. Each player has a different probability
* for scoring runs. 
* 
* Coding problem is to simulate the match, ball by ball.
*
* @see https://www.geektrust.in/api/pdf/open/PS4
*/
class One {
    
    constructor() {
        this.replay = new Replay();
    }
    
    async start() {
        const replayOvers = 4;
        const chasingRuns = 40;

        Common.heading(`Replaying ${replayOvers}, chasing ${chasingRuns}`);
        const win = this.replay.chase(chasingRuns, replayOvers);
        
        this.verdict(win)
    }

    verdict(win) {
        if (win) {
            return Common.heading("WON");
        }
        
        Common.heading('LOST', 'bgRed.white.bold')
    }
}

module.exports = One;