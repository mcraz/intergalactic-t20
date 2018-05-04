const _      = require("lodash");
const Common = require("../../common");

/**
* You might smell a bit of a redux pattern "NOT REACT"
* brewing up in this class. That is cz I have been
* experimenting with that. Haven't tried react
* but the idea of even-sourced-ish system
* is certainly enticing.
*/
class InningPresenter {
    commentary(inn) {
        const { data, state, remainingRuns } = inn;
        const { players, balls } = data;
        
        if (state.outcomes.length === 0) {
        	// no plays yet
        	return;
        }

        const [i, outcome] = _.last(state.outcomes);
        const what = outcome === 7 ? "OUT" : outcome;
        const name = _.padEnd(players[i].name, 15);
        const overAndBall = inn.describeOverBall(".");
        
        if (inn.ballSeq() === 1 && inn.remainingRuns) {
            this.showOverStats(overAndBall, inn, balls, outcome);
        }        

        Common.dim(`${overAndBall} : ${name} : ${what}`);
    }
    
    showOverStats(overAndBall, inn, balls, outcome) {
        const [over, ball] = overAndBall.split(".").map(parseFloat);
        
        
        let msg = `${balls / 6 - over + 1} overs left`;
        
        if (inn.remainingRuns) {
            msg += ` with ${inn.remainingRuns + outcome} runs to win\n`;
        }
    
        Common.zero(msg);
        
    }

    scorecard(inn) {
        const players  = inn.data.players;
        const outcomes = inn.state.outcomes;
        
        const groupdByPlayer = _.groupBy(outcomes, 0);
        
        const messages = [];
        
        for (let i in players) {
            const plays  = groupdByPlayer[i];
            const player = players[i];
            
            const message = this.getPlayerScorecard(player, plays);
            
            messages.push(message);
        }
        
        Common.zero('\n');

        Common.list(messages);
    }

    getPlayerScorecard(player, plays) {
        const out    = plays && _.last(plays)[1] === 7;
        const scores = !out ? plays : _ .initial(plays);
        const balls  = _.size(plays);
        const runs   = _.sumBy(scores, 1);
        
        return `${player.name}${balls && !out ? "*" : ""} : ${runs} (${balls} balls)`;
    }
}

module.exports = InningPresenter;