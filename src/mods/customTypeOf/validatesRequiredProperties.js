"use strict";

/**
 * @name validatesRequiredProperties
 * @function
 * @param {Object} instance instance object
 * @param {function} done callback
 * @returns {{res: number}|{error: number}}
 */
const validatesRequiredProperties = (instance, done) => {
    try {
        if (typeof done === "function") {
            for (let i = (instance.required.length - 1); i >= 0; i--) {
                const propriety = instance.required[i];
                if (typeof instance[propriety] === "undefined") return done({error: 1});
                if (i === 0) return done({res: 1});
            }
        } else return done({error: 1});
    } catch {
        return done({error: 1});
    }
}
/**
 * @private
 * @type {{validatesRequiredProperties: function(Object, Function): ({res: number}|{error: number})}}
 */
exports = module.exports = {
    ...{validatesRequiredProperties}
};