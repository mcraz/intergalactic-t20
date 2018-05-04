const sinon = require("sinon");
const { expect } = require("chai");
const Replay = require('../src/Domain/Match/Replay')
const Player = require("../src/Domain/Player/Player");

function mock() {
    return new Replay();
}

describe('Match : Replay', () => {
    it("creates a inning", async () => {
        const replay = mock();

        const spy = sinon.spy(replay, "createInning");

        replay.chase(10, 2);
        
        expect(spy.called).to.be.ok;
    });
    
    it("creates a inning with default 20 overs", async () => {
        const replay = mock();

        const chase = sinon.spy(replay, "chase");
        const createInning = sinon.spy(replay, "createInning");

        replay.chase(10);
        
        expect(chase.called).to.be.ok;
        expect(chase.calledOnceWithExactly(10)).to.be.ok;
        expect(createInning.calledOnceWith(20, 10)).to.be.ok;
    });

    it("inning has 4 overs remaining", () => {
        const replay = mock();
        const inn = replay.createInning(4, 40);
        
        expect(inn.state.ballsDelivered).to.be.a("number");
        expect(inn.state.ballsDelivered).to.equal(96)
    });
    
    it("inning has a team", () => {
        const replay = mock();
        const inn = replay.createInning(4, 40);
        
        expect(inn.data.players).to.be.an("array");
    });
    
    it("team has 4 members", () => {
        const replay = mock();
        const inn = replay.createInning(4, 40);
        
        expect(inn.data.players).to.have.lengthOf(4);
    });
    
    it("team members are, infact, players", () => {
        const replay = mock();
        const inn = replay.createInning(4, 40);
        
        inn.data.players.forEach(member => {
            expect(member).to.be.an.instanceof(Player);
        });
    });
    
    it("should allow to deliver next ball", () => {
        const replay = mock();
        const inn = replay.createInning(4, 40);
        
        expect(inn.isAllowedNext()).to.be.true;
    });
    
    it("should have 4 wickets in total", () => {
        const replay = mock();
        const inn = replay.createInning(4, 40);
        
        expect(inn.data.wickets).to.equal(3);
    });
    
    it("should have 4 wickets remaining", () => {
        const replay = mock();
        const inn = replay.createInning(4, 40);
        
        expect(inn.remainingWickets).to.equal(3);
    });
    
    it("should have 4 overs remaining", () => {
        const replay = mock();
        const inn = replay.createInning(4, 40);
        
        expect(inn.remainingBalls).to.equal(4 * 6);
    });

    it("should say 17.1 on first ball", () => {
      const replay = mock();
      const inn = replay.createInning(4, 40);

      inn.nextBall();

      expect(inn.describeOverBall()).to.equal("17.1");
    });

    it("should have a valid outcome", () => {
      const replay = mock();
      const inn = replay.createInning(4, 40);

      inn.nextBall();

      expect(inn.state.outcomes).to.have.length(1);
      expect(inn.state.outcomes.pop()[1]).to.be.within(0, 7);
    });

    it("should increment ball count", () => {
      const replay = mock();
      const inn = replay.createInning(4, 40);

      const count = inn.state.ballsDelivered;
      
      inn.nextBall();

      expect(inn.state.ballsDelivered).to.equal(count + 1);
    });

})