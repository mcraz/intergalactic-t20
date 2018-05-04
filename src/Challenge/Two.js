const Common    = require("../common");
const SuperOver = require("../Domain/Match/SuperOver");

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
        this.superOver = new SuperOver();
    }
    
    async start() {
        Common.heading("First Inning");
        const target = this.superOver.first("llc");
        
        Common.heading(`Second Inning | Chasing ${target} runs`);
        const win = this.superOver.chase("esq", target);

        this.verdict(win);
    }

    verdict(win) {
        const victor = win ? "Enchai" : "Lengaburu";
        
        Common.heading(`${victor} won`);
    }
}

module.exports = Two;