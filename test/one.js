const { expect } = require("chai");
const One = require('../src/Challenge/One')
const Player = require("../src/Domain/Player/Player");
const SecondInning = require("../src/Domain/Inning/SecondInning");
const InningPresenter = require('../src/Domain/Inning/InningPresenter')

describe('Problem : One', () => {
    it('"npm run one" starts class "One"', () => {
        const package = require('../package.json');
        
        expect(package.scripts).contain.keys('one')
        expect(package.scripts.one).equal("node index.js One");
    })
    
    it('has a copy of Inning presenter', () => {
        const one = new One;
        
        expect(one).contain.property("present");
        expect(one.present).instanceOf(InningPresenter);
    });
    
    it("creates a inning", async () => {
        const one = new One();
        const inn = one.createInning();
        
        expect(inn).to.be.instanceof(SecondInning);
    });
    
    it("inning has 4 overs remaining", () => {
        const one = new One();
        const inn = one.createInning();
        
        expect(inn.state.ballsDelivered).to.be.a("number");      
        expect(inn.state.ballsDelivered).to.equal(96)
    });
    
    it("inning has a team", () => {
        const one = new One();
        const inn = one.createInning();
        
        expect(inn.data.players).to.be.an("array");
    });
    
    it("team has 4 members", () => {
        const one = new One();
        const inn = one.createInning();
        
        expect(inn.data.players).to.have.lengthOf(4);
    });
    
    it("team members are, infact, players", () => {
        const one = new One();
        const inn = one.createInning();
        
        inn.data.players.forEach(member => {
            expect(member).to.be.an.instanceof(Player);
        });
    });
    
    it("should allow to deliver next ball", () => {
        const one = new One();
        const inn = one.createInning();
        
        expect(inn.isAllowedNext()).to.be.true;
    });
    
    it("should have 4 wickets in total", () => {
        const one = new One();
        const inn = one.createInning();
        
        expect(inn.data.wickets).to.equal(3);
    });
    
    it("should have 4 wickets remaining", () => {
        const one = new One();
        const inn = one.createInning();
        
        expect(inn.remainingWickets).to.equal(3);
    });
    
    it("should have 4 overs remaining", () => {
        const one = new One();
        const inn = one.createInning();
        
        expect(inn.remainingBalls).to.equal(4 * 6);
    });

    it("should describe over.ball as 17.1 after one ball", () => {
      const one = new One();
      const inn = one.createInning();

      inn.nextBall();

      expect(inn.describeOverBall()).to.equal("17.1");
    });

    it("should have a valid outcome", () => {
      const one = new One();
      const inn = one.createInning();

      inn.nextBall();

      expect(inn.state.outcomes).to.have.length(1);
      expect(inn.state.outcomes.pop()[1]).to.be.within(0, 7);
    });

    it("should increment ball counter state", () => {
      const one = new One();
      const inn = one.createInning();

      const counter = inn.state.ballsDelivered;
      
      inn.nextBall();

      expect(inn.state.ballsDelivered).to.equal(counter + 1);
    });

})