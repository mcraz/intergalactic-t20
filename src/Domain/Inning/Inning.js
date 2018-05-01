const _      = require("lodash");
const Common = require("../../common");

/**
* You might smell a bit of a redux pattern "NOT REACT"
* brewing up in this class. That is cz I have been
* experimenting with that. Haven't tried react
* but the idea of even-sourced-ish system
* is certainly enticing.
*/
class Inning {
    constructor({ players, overs }) {
        this.data = {
            balls: overs * 6,
            players: players,
            wickets: _.min([players.length - 1, 10])
        };
        
        this.state = {
            runs: 0,
            outcomes: [],
            ballsDelivered: 0,
            wickets: 0,
            strikerIndex: 0,
            nonStrikerIndex: 1
        };
    }
    
    get striker() {
        return _.get(this.data.players, this.state.strikerIndex);
    }
    
    get remainingBalls() {
        return this.data.balls - this.state.ballsDelivered;
    }
    
    get remainingWickets() {
        return this.data.wickets - this.state.wickets;
    }
    
    ballSeq() {
        return (this.state.ballsDelivered - 1) % 6 + 1;
    }
    
    hasBalls() {
        return this.remainingBalls > 0;
    }
    
    hasWickets() {
        return this.remainingWickets > 0;
    }
    
    /**
    * Ball, the next ball.
    *
    * Calling this would result in delivering the next
    * ball. And calculate a new state.
    *
    * All events are dispatched here. Keeping a central
    * entry point makes it easy to debug and restricts
    * state-change notifications to be dispatched
    * ONLY from here.
    */
    nextBall() {
        this.validate();

        
        const outcome = this.striker.hit();
        
        // const isOut = outcome === 7;
        // const isRun = outcome !== 7;
        // const isOdd = outcome % 2;
        // const isOverChange = this.ballSeq() == 6;
        
        this.onBall();
        this.onOutcome(outcome);
        outcome === 7 && this.onStrikerOut();
        outcome !== 7 && this.onStrikerHit(outcome);
        outcome !== 7 && outcome % 2 && this.onOddRun();
        this.ballSeq() == 6 && this.onOver();
    }
    
    validate() {
        if (!this.isAllowedNext()) {
            throw new Error("NextBallNotAllowed");
        }
    }
    
    onOver() {
        this.swap();
    }
    
    onBall() {
        let { ballsDelivered } = this.state;
        
        ballsDelivered = ballsDelivered + 1;
        
        this.setState({ ballsDelivered });
    }
    
    onOutcome(outcome) {
        const state = this.state;
        
        const outcomes = state.outcomes.concat([[state.strikerIndex, outcome]]);
        
        this.setState({ outcomes });
    }
    
    onStrikerHit(score) {
        const state = this.state;
        
        const runs = state.runs + score;
        
        this.setState({ runs });
    }
    
    onOddRun() {
        this.swap();
    }
    
    onStrikerOut() {
        const state = this.state;
        
        const wickets = state.wickets + 1;
        const strikerIndex = this.getNextStrikerIndex();
        
        this.setState({ wickets, strikerIndex });
    }
    
    swap() {
        let { strikerIndex, nonStrikerIndex } = this.state;
        
        [strikerIndex, nonStrikerIndex] = [nonStrikerIndex, strikerIndex];
        
        this.setState({ strikerIndex, nonStrikerIndex });
    }
    
    getNextStrikerIndex() {
        const { strikerIndex, nonStrikerIndex } = this.state;
        
        const next = 1 + _.max([strikerIndex, nonStrikerIndex]);
        
        if (this.hasWickets() && _.has(this.data.players, next)) {
            return next;
        }
        
        return null;
    }
    
    describeOverBall(separator = ".") {
        const over = _.ceil(this.state.ballsDelivered / 6);
        
        return [over, this.ballSeq()].join(separator);
    }
    
    isAllowedNext() {
        return this.hasBalls() && this.hasWickets();
    }
    
    setState(delta) {
        const old = _.clone(this.state);
        const modified = _.merge(old, delta);
        
        this.state = modified;
        
        return this.state;
    }
}

module.exports = Inning;