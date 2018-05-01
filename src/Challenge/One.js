const _               = require("lodash");
const Common          = require("../common");
const Player          = require("../Domain/Player/Player");
const SecondInning    = require("../Domain/Inning/SecondInning");
const InningPresenter = require("../Domain/Inning/InningPresenter");

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
        this.present = new InningPresenter();
    }
    
    async start() {
        const inn = this.createInning();
        
        while(inn.isAllowedNext()) {
            inn.nextBall();
            
            this.present.commentary(inn);
        }
        
        this.present.scorecard(inn)
        
        this.verdict(inn)
    }
    
    createInning() {
        const inn = new SecondInning({
            players: Player.fetchAll(),
            overs: 20,
            chasing: 40
        });
        
        // set state to the 16th over, since we will be playing
        // only the last four overs
        inn.setState({ ballsDelivered: (20 - 4) * 6 });

        return inn;
    }

    verdict(inn) {
        if ( !inn.hasLost()) {
            Common.heading("WON");
        } else {
            Common.heading('LOST', 'bgRed.white.bold')
        }
    }
}

module.exports = One;