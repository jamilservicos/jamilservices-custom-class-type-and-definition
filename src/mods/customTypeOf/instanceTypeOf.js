"use strict";

/**
 * @name instanceTypeOf
 * @function
 * @param {Object} data
 * @return {boolean}
 */
const instanceTypeOf = (data) => {
    try {
        /**
         * @property {instance|undefined} instance
         * @property {string|undefined} customTypeName
         */
        const {instance, customTypeName} = data;
        if (typeof instance === "undefined" || typeof customTypeName === "undefined") return false;
        return (instance.constructor.name.toString() === customTypeName.toString());
    } catch {}
    return false;
};
/**
 * @private
 * @type {{instanceTypeOf: function(Object): boolean}}
 */
exports = module.exports = {
    ...{instanceTypeOf}
};