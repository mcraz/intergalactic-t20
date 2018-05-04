const _ = require("lodash");
const sinon = require("sinon");
const { expect } = require("chai");
const Player = require("../src/Domain/Player/Player");
const SecondInning = require("../src/Domain/Inning/SecondInning");

const seed = {
    players: Player.fetchAll(),
    overs: 20,
    chasing: 40
};

function mock() {
    return new SecondInning(_.cloneDeep(seed));
}

function stubAttempt(inn) {
    for (let player of inn.data.players) {
        sinon.stub(player, "attempt").returns(2);
    }
    
    return inn;
}

describe('SecondInning', () => {
    
    it('should represent second inning', () => {
        const inn = mock();
        
        expect(inn.data).to.have.property("chasing");
        expect(inn.data.chasing).to.have.equal(40);
    })
    
    it('should track remaining runs', () => {
        const inn = mock();
        
        expect(inn.remainingRuns).to.equal(40);
    })
    
    it('should update remaining runs upon scoring', () => {
        const inn = stubAttempt( mock() );
        
        _.times(4, () => inn.nextBall());
        
        expect(inn.remainingRuns).to.equal(40 - 4 * 2);
    })
    
    it('should loose when out of wickets', () => {
        const inn = mock();
        
        expect(inn.hasLost()).to.be.false;
        
        inn.state.wickets = 3;
        
        expect(inn.hasLost()).to.be.true;        
    })
    
    it('should loose when out of balls', () => {
        const inn = mock();
        
        expect(inn.hasLost()).to.be.false;
        
        inn.state.ballsDelivered = 120;
        
        expect(inn.hasLost()).to.be.true;        
    })
    
    
    it("should win when chase is overcome", () => {
        const inn = stubAttempt(mock());
        
        _.times(20, () => inn.nextBall());
        
        expect(inn.hasWon()).to.be.true;
    });
    
});
