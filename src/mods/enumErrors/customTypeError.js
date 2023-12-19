"use strict";

/**
 * Custom TypeError function.
 *
 * This function is designed to log a TypeError message specific to a custom type
 * and return a boolean indicating the error occurrence.
 *
 * @function
 * @name  customTypeError
 * @param {string} customType - The name of the custom type that caused the error.
 * @returns {boolean} Returns false to indicate that a type error has occurred.
 */
const customTypeError = (customType) => {
    console.log("typeOf error: TypeError on " + customType);
    return false;
};

/**
 * @private
 * @description Exports the customTypeError function.
 */
exports = module.exports = {
    customTypeError
};