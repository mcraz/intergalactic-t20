const sinon = require("sinon");
const { expect } = require("chai");
const Player = require("../src/Domain/Player/Player");
const Inning = require("../src/Domain/Inning/Inning");
const SecondInning = require("../src/Domain/Inning/SecondInning");
const SuperOver = require('../src/Domain/Match/SuperOver')

function mock() {
    return new SuperOver();
}

describe('Match : SuperOver', () => {
    it("should play first inning", async () => {
        const so = mock();
        const createInning = sinon.spy(so, "createInning");

        so.first('llc');
        
        expect(createInning.called).to.be.ok;
        expect(createInning.firstCall.returnValue).to.be.instanceOf(Inning);
    });

    it("should play for 1 over", async () => {
        const so = mock();
        const createInning = sinon.spy(so, "createInning");

        so.first('llc');
        
        expect(createInning.called).to.be.ok;
        expect(createInning.firstCall.args[0] === 1).to.be.ok;
    });

    it("should be played by correct team", async () => {
        const so = mock();
        const createInning = sinon.spy(so, "createInning");

        so.first('esq');
        
        expect(createInning.called).to.be.ok;
        expect(createInning.firstCall.args['2'] === 'esq').to.be.ok;
    });

    it("should return runs after first ining", async () => {
        const so = mock();
        const runs = so.first('esq');
        
        expect(runs).to.be.a('number');
        expect(runs).to.be.within(0, 6 * 6);
    });

    it("should verdict 'win' if no chase", async () => {
        const so = mock();
        const createInning = sinon.spy(so, "createInning");
        
        const win = so.chase('esq', 0);
        
        expect(createInning.notCalled).to.be.ok;
        expect(win).to.equal(true);
    });
    
    it("should play second inning", async () => {
        const so = mock();
        const createInning = sinon.spy(so, "createInning");
        const play = sinon.spy(so, "play");
        
        so.chase('esq', 1);
        
        expect(createInning.calledOnce).to.be.ok;
        expect(createInning.firstCall.returnValue).to.be.instanceOf(SecondInning);
        
        expect(play.calledOnce).to.be.ok;
        expect(play.firstCall.args[0]).to.equal(createInning.firstCall.returnValue);
    });


    it("should return verdict", async () => {
        const so = mock();
        
        const verdict = so.chase('esq', 1);
        
        expect(verdict).to.be.a('boolean')
    });

})