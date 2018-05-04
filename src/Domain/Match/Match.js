const _ = require("lodash");
const Common = require("../../common");
const Player = require("../Player/Player");
const Inning = require("../Inning/Inning");
const SecondInning = require("../Inning/SecondInning");
const InningPresenter = require("../Inning/InningPresenter");

class Match {
    constructor() {
        this.present = new InningPresenter();
    }
    
    createInning(oversToReplay, chasing = null, team = '') {
        const players = this.resolvePlayers(team)
        
        const data = { players };

        if (chasing) {
            data.chasing = chasing
        }

        const inn = new (chasing ? SecondInning : Inning)(data);

        inn.setState({ ballsDelivered: (inn.data.balls/6 - oversToReplay) * 6 });

        return inn;
    }

    play(inn) {
        while (inn.isAllowedNext()) {
            inn.nextBall();
            
            this.present.commentary(inn);
        }
        
        this.present.scorecard(inn);
        
        return inn;
    }

    resolvePlayers(team) {
        team = this.resolveTeam(team);
        
        return Player.fetchAll(team);
    }
    
    resolveTeam(name = '') {
        return `player${name}`;
    }
}

module.exports = Match