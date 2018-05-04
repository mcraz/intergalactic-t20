const Match = require('./Match')

class Replay extends Match {

    chase(chasing, overs = 20) {
        const inn = this.createInning(overs, chasing);
        
        this.play(inn)
        
        return inn.hasWon();
    }
}

module.exports = Replay