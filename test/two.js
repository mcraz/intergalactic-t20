const sinon = require("sinon");
const { expect } = require("chai");
const Two = require("../src/Challenge/Two");
const Common = require("../src/common");
const SuperOver = require("../src/Domain/Match/SuperOver");

function mock() {
    return new Two();
}

before(() => {
    Common.silent();
})

after(() => {
    Common.silent(false);
})

describe("Problem : Two", () => {
    it('"npm run two" starts class "Two"', () => {
        const package = require("../package.json");
        
        expect(package.scripts).contain.keys("one");
        expect(package.scripts.one).equal("node index.js One");
    });
    
    it("should play a super over", () => {
        const two = mock();
        
        expect(two).contain.property("superOver");
        expect(two.superOver).instanceOf(SuperOver);
    });
    
    it("should play 1st inning", async () => {
        const two = mock();
        
        const i1 = sinon.spy(two.superOver, "first");
        
        await two.start();
        
        expect(i1.calledOnce).to.be.true;
    });
    
    it("should play 2nd inning", async () => {
        const two = mock();
        
        const i2 = sinon.spy(two.superOver, "chase");
        
        await two.start();
        
        expect(i2.calledOnce).to.be.true;
    });
});
