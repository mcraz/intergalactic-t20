const _ = require("lodash");
const { expect } = require("chai");
const Player = require("../src/Domain/Player/Player");
const DataSet = require("../src/Domain/DataSet");


function realPlayer() {
    return new Player(Player.any());
}

function mockPlayer(override) {
    return new Player(
        _.merge({ name: "Kapil", weights: [1] }, override)
    );
}

describe('Player', () => {
    
    it('should also be a DataSet', () => {
        const player = mockPlayer();

        expect(player).to.be.instanceOf(DataSet);
    })

    it('should have a name', () => {
        const player = mockPlayer();

        expect(player.name).to.be.equal("Kapil");
    })
    
    it('should have weights for all outcomes', () => {
        const player = Player.any()

        expect(player.weights).to.be.instanceOf(Array);
        expect(player.weights).to.have.length(8);
    })
    
    describe('fetchAll()', () => {

        it('should create instances', () => {
            const players = Player.fetchAll()

            for (let player of players) {
                expect(player).to.be.instanceOf(Player);
            }
        })

        it('should return all records', () => {
            const players = Player.fetchAll();
            const dbLength = Player.all().length;

            expect(players).to.be.instanceOf(Array);
            expect(players).to.be.of.length(dbLength);
        })

    })

    describe('attempt()', () => {

        it('should return a valid outcome', () => {
            const player = mockPlayer();

            expect(player.attempt()).to.be.within(0, 7);
        })

    })

});