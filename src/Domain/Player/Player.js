const _       = require("lodash");
const Common  = require("../../common");
const DataSet = require('../DataSet');

class Player extends DataSet {
	constructor({ name, weights }) {
		super();
		
		this.name    = name;
		this.weights = weights;
	}
	
	/**
	 * Builds instances for reach player.
	 * 
	 * @returns {Array<Player>}
	 */
	static fetchAll(db) {
		return this.all(db)
			.map(profile => new Player(profile));
	}
	
	/**
	 * Bat, using the weights for the player.
	 * 
	 * @returns {Number} Outcome of the batting
	 */
	attempt() {
		return Common.weightedRand(this.weights);
	}
}

module.exports = Player;