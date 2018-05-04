const _ = require("lodash");
const { expect } = require("chai");
const sinon = require("sinon");
const Inning = require("../src/Domain/Inning/Inning");
const Player = require("../src/Domain/Player/Player");

const seed = {
    players: Player.fetchAll(),
    overs: 20
};

function mock() {
    return new Inning(_.cloneDeep(seed));
}

function stubAttempt(inn, score = 2) {
    for (let player of inn.data.players) {
        sinon.stub(player, "attempt").returns(score);
    }
    
    return inn;
}

describe('Inning', () => {
    
    it('should represent first inning', () => {
        const inning = mock();
        
        expect(inning.data).to.not.have.property('chasing');
    })
    
    it('should have correct total wicket count', () => {
        const inning = mock();
        
        expect(inning.data.wickets).is.equal(3);
    })
    
    it('should have correct total ball count', () => {
        const inning = mock();
        
        expect(inning.data.balls).is.equal(120);
    })
    
    it('should have all assigned players', () => {
        const inning = mock();
        const players = inning.data.players;
        
        expect(players).to.be.of.length(seed.players.length);
        
        for (let player of players) {
            expect(player).to.be.instanceOf(Player);
        }
    })
    
    it('should have correct initial state', () => {
        const inning = mock();
        const expectd = { runs: 0, outcomes: [], ballsDelivered: 0, wickets: 0, strikerIndex: 0, nonStrikerIndex: 1 };
        
        expect(inning.state).to.deep.equal(expectd);
    })
    
    it('should have a striker', () => {
        const inning = mock();
        
        expect(inning.striker).to.be.instanceOf(Player);
    })
    
    it('should have all balls remaining at start', () => {
        const inning = mock();
        
        expect(inning.remainingBalls).to.equal(seed.overs * 6);
    })
    
    it('should have all wickets remaining at start', () => {
        const inning = mock();
        
        expect(inning.remainingWickets).to.equal(3);
    })
    
    it('should show correct ball sequence', () => {
        const inn = mock();
        
        for (let player of inn.data.players)
        sinon.stub(player, "attempt").returns(1);
        
        expect(inn.ballSeq()).to.equal(0);
        
        _.times(10, () => inn.nextBall());
        
        expect(inn.ballSeq()).to.equal(4);
    })
    
    it("should have a team", () => {
        const inn = mock();
        
        expect(inn.data.players).to.be.an("array");
        expect(inn.data.players).to.have.length.greaterThan(2);
    });
    
    it("should allow to deliver next ball", () => {
        const inn = mock();
        
        
        expect(inn.isAllowedNext()).to.be.true;
    });
    
    it("should describe correct over.ball", () => {
        const inn = mock();
        
        for (let player of inn.data.players)
        sinon.stub(player, "attempt").returns(1);
        
        const next = () => {
            inn.nextBall();
            return inn.describeOverBall();
        }
        
        const output = _.times(10, next)
        
        expect(output).to.have.members(
            [ '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '2.1', '2.2', '2.3', '2.4' ]
        );
    });
    
    it("should increment ball count", () => {
        const inn = mock();
        
        const count = inn.state.ballsDelivered;
        
        inn.nextBall();
        
        expect(inn.state.ballsDelivered).to.equal(count + 1);
    });
    
    it("should restrict gameplay when no balls left", () => {
        const inn = mock();
        const next = inn.nextBall.bind(inn);
        
        inn.state.ballsDelivered = inn.state.overs * 6 - 1;
        
        expect(next).to.throw("NextBallNotAllowed");
    });

    it("should restrict gameplay when no balls left", () => {
        const inn = stubAttempt( mock(), 7 );
        const next = inn.nextBall.bind(inn);
        
        _.times(3, () => inn.nextBall());
        
        expect(next).to.throw("NextBallNotAllowed");
    });
    
    it("should use weighted-random strike generator", () => {
        const inn = mock();
        const attemptSpy = sinon.spy(inn.striker, "attempt");
        
        inn.nextBall()
        
        expect(attemptSpy.called).to.be.true;
    });
    
    // scores of tests can follow, but you get it ...
});