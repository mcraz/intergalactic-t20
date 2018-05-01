const _               = require("lodash");
const Common          = require("../common");
const Player          = require("../Domain/Player/Player");
const Inning          = require("../Domain/Inning/Inning");
const SecondInning    = require("../Domain/Inning/SecondInning");
const InningPresenter = require("../Domain/Inning/InningPresenter");

/**
* 
* ~ The tie breaker ~
* 
* ------------------------------------------------------------------
* 
* The final has resulted in a tie! Just like '07. Now
* the result will be decided by a one over tie
* breaker. 2 batsmen, 6 balls, who will win?
* 
* @see https://www.geektrust.in/api/pdf/open/PS4
*/
class Two {
    
    constructor() {
        this.present = new InningPresenter();
    }
    
    async start() {
        Common.heading("First Inning");
        const first  = this.firstInning();
        const target = first.state.runs;

        if (!target) {
            this.verdict(false);
        }

        Common.heading(`Second Inning. Target: ${target}`)
        const second = this.secondInning(target);

        this.verdict(second.hasLost());
    }

    firstInning() {
        const players = Player.fetchAll("players-2llc");
        const inn     = new Inning({ overs: 1, players });
        return this.play(inn);
    }

    secondInning(target) {
        const players = Player.fetchAll("players-2esq");
        const inn     = new SecondInning({
          overs  : 1,
          chasing: target,
          players,
        });
        return this.play(inn);
    }

    play(inn) {
        while (inn.isAllowedNext()) {
          inn.nextBall();

          this.present.commentary(inn);
        }

        this.present.scorecard(inn);

        return inn;
    }

    verdict(win) {
        win 
            ? Common.heading("Lengaburu won") 
            : Common.heading("Enchai won");
    }
}

module.exports = Two;