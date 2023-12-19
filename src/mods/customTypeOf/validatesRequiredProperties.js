"use strict";

/**
 * Validates if all required properties are present in the object instance.
 *
 * This function checks an object instance against a list of required property names.
 * It returns a callback with an object indicating the result of the validation.
 * The function handles the presence of all required properties and also gracefully
 * manages error scenarios such as missing callback or properties.
 *
 * @function
 * @name  validatesRequiredProperties
 * @param {Object} instance - The object instance to be validated.
 * @param {Array.<string>} instance.required - An array of property names that are required in the instance object.
 * @param {Function} done - Callback function to which the result will be passed as an argument.
 * @returns {Function} This function returns the done callback function with the appropriate object as an argument.
 *                     If all the required properties exist, it returns the done callback with `{res: 1}`.
 *                     If any required property doesn't exist or if anything goes wrong, it returns the done callback with `{error: 1}`.
 * @example
 * // create an object instance with a property required and a name property
 * let instance = { required: ['name'], name: 'User Test' };
 * let done = function(arg) {
 *   if (arg.res) {
 *     console.log('Validation passed');
 *   } else {
 *     console.log('Validation failed');
 *   }
 * };
 * // use the function
 * validatesRequiredProperties(instance, done);
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
 * @description Exports the validatesRequiredProperties function.
 *              This function is intended for internal use within the module or package.
 */
exports = module.exports = {
    ...{validatesRequiredProperties}
};