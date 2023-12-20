"use strict";

/**
 * Enumerated errors object.
 *
 * This object holds a collection of different error types
 * for the application. Each key in this object represents a specific error type
 * and is associated with a corresponding error handling module.
 *
 * @memberof module:CustomTypeInterfaceModule
 * @name enumErrors
 * @property {Function} CUSTOMTYPEERROR - The function imported from "./customTypeError" module,
 *                                        used to handle custom type errors.
 */
const enumErrors = {
    "CUSTOMTYPEERROR": require("./customTypeError")
};

/**
 *
 * Exports the enumErrors object. This object is meant for internal use within the module or package.
 *
 * @private
 */
exports = module.exports = {
    ...{enumErrors}
};