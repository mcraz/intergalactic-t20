const _               = require("lodash");
const sinon           = require("sinon");
const { expect }      = require("chai");
const Player          = require("../src/Domain/Player/Player");
const SecondInning    = require("../src/Domain/Inning/SecondInning");
const InningPresenter = require("../src/Domain/Inning/InningPresenter");

const seed = {
    players: Player.fetchAll(),
    overs: 20,
    chasing: 40
};

function mock() {
    return new SecondInning(_.cloneDeep(seed));
}

describe('InningPresenter', () => {
    
    it('should print out commentary', () => {
        const inn = mock();
        const present = new InningPresenter()
        
        expect(present.commentary(inn)).to.not.throw;
    })
    
    it('should print out scorecard', () => {
        const inn = mock();
        const present = new InningPresenter()
        
        expect(present.scorecard(inn)).to.not.throw;
    })
    
});
