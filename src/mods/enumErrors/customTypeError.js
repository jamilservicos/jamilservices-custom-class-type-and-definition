"use strict";

/**
 * @name customTypeError
 * @function
 * @param {string} customType
 * @returns {boolean}
 */
const customTypeError = (customType) => {
    console.log("typeOf error: TypeError on " + customType);
    return false;
};
/**
 * @private
 * @inheritDoc
 */
exports = module.exports = {
    customTypeError
};