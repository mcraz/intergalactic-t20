const _ = require("lodash");
const { expect } = require("chai");
const sinon = require("sinon");
const DataSet = require("../src/Domain/DataSet");
const Player = require("../src/Domain/Player/Player");

describe('DataSet', () => {
    
    it('all() : should return all records dataset', () => {
        expect(Player.all()).to.be.instanceOf(Array);
        expect(Player.all()).to.be.length(4);
    })

    it('all() : should choose correct dataset', () => {
        const players = Player.all("players-2esq");

        expect(players).to.be.length(2);
        expect(players[0].name).to.equal("DB Vellyers");
    })

    it('any() : should return a random record', () => {
        const players = Player.any(null, "players-2esq");

        expect(players).to.be.instanceOf(Object);
    })

    it('any(#) : should return multiple random record', () => {
        const players = Player.any(2, "players-2esq");

        expect(players).to.be.instanceOf(Array);
        expect(players).to.be.length(2);
    })

    it('findOrfail() : should search records', () => {
        const players = Player.firstOrFail("name", "Kirat Boli");

        expect(players).to.be.instanceOf(Player);
    })
    
    it('findOrfail() : should throw when record is not found', () => {
        const fn = Player.firstOrFail.bind(Player, "name", "Geek Play");

        expect(fn).to.throw(
            `A Player with [name] = [GEEK PLAY] could not be found`
        )
    })
    
    it('each() : should iterate all records', () => {  
        const spy = sinon.spy();

        Player.each(spy);

        expect(spy.callCount).to.equal(4)
    })

});