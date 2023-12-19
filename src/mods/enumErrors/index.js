"use strict";

/**
 * @name enumErrors
 */
const enumErrors = {
    "CUSTOMTYPEERROR": require("./customTypeError")
};
/**
 * @private
 */
exports = module.exports = {
    ...{enumErrors}
};