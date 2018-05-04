const _ = require("lodash");
const chalk = require("chalk");
const Youch = require('youch');
const YouchTerminal = require('youch-terminal');

let silenced;

/**
 * Used to silence writing to console when testing
 * or if you just like silence :D
 * 
 * @param {Boolean} yes 
 */
function silent(yes = true) {
    silenced = yes;
}

/**
 * Add padding to given string so that is shows up at the
 * center of the output.
 * 
 * @param {String} str
 */
function center(str, print = false) {
    let w = process.stdout.columns;
    
    str = _.pad(str, w <= 130 ? w-2 : w/2)

    print && zero(str, true)

    return str;
}

/**
 * Display a message as heading.
 * 
 * @param {String} message 
 */
function heading(message, style = "white.bgGreen.bold") {
    style = _.get(chalk, style, chalk.white)

    zero('\n' + style(center(message)) + '\n', true);
}

/**
 * Display a message as dimmed text.
 * 
 * @param {String} message 
 */
function dim(message) {
    zero(chalk.dim(message), true);
}

function list(lines) {
    const w = center('').length;
    const avg = _.maxBy(lines, 'length').length;

    lines = lines.map(line => ' '.repeat(Math.abs(Math.floor(w/2 - avg/2))) + line)
    
    zero(lines.join('\n'), true);
}

/**
 * Clear the line, move cursor to start of the line. And
 * write the message, if one is passed.
 * 
 * @param {String} message 
 */
function zero(message = null, newLine = false) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    if (message && !silenced) {
        message += newLine ? "\n" : "";
        process.stdout.write(message);
    }
}

/**
 * Better weighted random libraries are available which are
 * way more effecient but I was lazy :P 
 * 
 * Had this one lying around from a game I once built
 * using genetic algorithm, that needed the weighted
 * randoms for gene selection & mutation.
 * 
 * Had to modify it a little to support array of primitives
 * as weights as opposed to fitness pops from collection
 * of entities.
 * 
 * @param {Array<Number>} weights 
 */
function weightedRand(weights) {
        let index = 0;
        
        let r = _.random(1, true);

        while (r > 0) {
            r -= weights[index];
            index += 1;
        }
        
        index -= 1;
        
        return index
}

/**
 * Report a given Error beautifully, using the Youch
 * reporter extension.
 * 
 * @param {Error} error 
 */
function ouch(error) {
    return new Youch(error, {}).toJSON().then((output) => {
        console.log(YouchTerminal(output))
    })
}

/**
 * Validate if the given path is a module that exists.
 * 
 * @param {String} path 
 * 
 * @throws if the module does not exist
 */
function validate(path) {
    const fs = require('fs')
    
    if ( !fs.existsSync(path)) {
        throw new Error(`Heyy ! I am sure you mean well, but, "${path}" does not exist.`)
    }

    return true;
}

/**
 * Start the application.
 * 
 * @param {String} path Path to module that you wish to boot
 */
function boot(path) {
    (async (m) => await (new m()).start())(require(path));
}

/**
 * Used as error handler function for uncaught exceptions.
 * 
 * @param {Error} err The uncaught error
 */
function uncaught(err) {    
    ouch(err).then(() => process.exit(1))
}

module.exports = {

    // app helpers
    ouch, boot, uncaught, validate,

    // domain helpers
    weightedRand,
    
    // cli styling helpers
    center, heading, zero, list, dim, silent
};
