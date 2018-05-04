const sinon = require("sinon");
const { expect } = require("chai");
const Common = require("../src/common");
const One = require('../src/Challenge/One')
const Replay = require('../src/Domain/Match/Replay')


before(() => {
    Common.silent();
})

after(() => {
    Common.silent(false);
})

describe('Problem : One', () => {
    it('"npm run one" starts class "One"', () => {
        const package = require('../package.json');
        
        expect(package.scripts).contain.keys('one')
        expect(package.scripts.one).equal("node index.js One");
    })
    
    it('should have a replay match', () => {
        const one = new One;
        
        expect(one).contain.property("replay");
        expect(one.replay).instanceOf(Replay);
    });
    
    it('should replay with for 40 runs', async () => {
        const one = new One;
        const spy = sinon.spy(one.replay, 'chase');

        await one.start()
        
        expect(spy.calledOnce).to.be.ok;
        expect(spy.firstCall.args[0]).to.equal(40);
    });
    
    it('should replay with for last 4 overs', async () => {
        const one = new One;
        const spy = sinon.spy(one.replay, 'chase');

        await one.start()
        
        expect(spy.calledOnce).to.be.ok;        
        expect(spy.firstCall.args[1]).to.equal(4);
    });


})