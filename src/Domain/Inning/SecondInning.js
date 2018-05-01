const _      = require("lodash");
const Common = require("../../common");
const Inning = require("./Inning");

/**
* You might smell a bit of a redux pattern "NOT REACT"
* brewing up in this class. That is cz I have been
* toexperimenting with it. Haven't tried react,
* yet but the idea ofeven-sourced-like-system
* is certainly enticing.
*/
class SecondInning extends Inning {
    constructor(start) {
        super(start)
        
        this.data = _.merge(this.data, {
            chasing: start.chasing,
        });
    }
    
    get remainingRuns() {
        return this.data.chasing - this.state.runs;
    }
    
    hasLost() {
        const hasChase = this.remainingRuns > 0;
        const hasW = this.hasWickets();
        const hasB = this.hasBalls();
        
        return hasChase && (!hasW || !hasB);
    }
    
    hasWon() {
        return this.remainingRuns < 1;
    }

    isAllowedNext() {
        return !(this.hasLost() || this.hasWon());
    }
}

module.exports = SecondInning;