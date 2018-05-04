const Match = require("./Match");

class SuperOver extends Match {
    
    first(team) {
        const inn = this.createInning(1, null, team);
        
        this.play(inn);
        
        return inn.state.runs;
    }
    
    chase(team, target) {
        if (!target) { 
            return true; 
        }

        const inn = this.createInning(1, target, team);
        
        this.play(inn);
        
        return inn.hasWon();
    }
    
    resolveTeam(name = '') {
        return super.resolveTeam(`s-2${name}`)
    }
}

module.exports = SuperOver