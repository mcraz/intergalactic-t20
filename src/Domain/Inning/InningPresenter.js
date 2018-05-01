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
        
        const [i, outcome] = _.last(state.outcomes);
        const what = outcome === 7 ? "OUT" : outcome;
        const name = _.padEnd(players[i].name, 15);
        const overAndBall = inn.describeOverBall(".");
        const [over, ball] = overAndBall.split(".").map(parseFloat);
        
        if (inn.ballSeq() === 1 && inn.remainingRuns) {
            let msg = `${balls / 6 - over + 1} overs left.`;
            
            if (inn.remainingRuns) {
                msg += `${inn.remainingRuns} runs to win\n`;
            }
            
            Common.zero(msg);
        }
        
        Common.dim(`${overAndBall} : ${name} : ${what}`);
    }
    
    scorecard(inn) {
        const players = inn.data.players;
        const outcomes = inn.state.outcomes;
        
        const groupdByPlayer = _.groupBy(outcomes, 0);
        
        const messages = [];
        
        for (let i in players) {
            const plays = groupdByPlayer[i];
            const player = players[i];
            
            const out = plays && _.last(plays)[1] === 7;
            const scores = !out ? plays : _.initial(plays);
            const balls = _.size(plays);
            const runs = _.sumBy(scores, 1);
            
            messages.push(
                `${player.name}${balls && out ? "" : "*"} : ${runs} (${balls} balls)`
            );
        }
        
        Common.zero('\n');

        Common.list(messages);
    }
}

module.exports = InningPresenter;