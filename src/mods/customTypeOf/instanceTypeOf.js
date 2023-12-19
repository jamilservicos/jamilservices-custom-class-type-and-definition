"use strict";

/**
 * Checks whether the constructor's name of the instance object matches the custom type name string.
 *
 * This function is intended to validate if a given instance object is of a specified custom type.
 * It compares the constructor name of the instance with the provided custom type name string.
 * The function is designed to handle cases where either the instance or the custom type name is undefined,
 * and it gracefully handles errors such as accessing the constructor property of a null or undefined instance.
 *
 * @function
 * @name  instanceTypeOf
 * @param {Object} data - An object containing the instance and the custom type name.
 * @param {Object} data.instance - The instance object to be checked.
 * @param {string} data.customTypeName - The custom type name string for comparison.
 * @returns {boolean} Returns true if the instance's constructor name matches the custom type name; otherwise, returns false.
 *                    If either instance or customTypeName is undefined, it also returns false.
 *                    Errors like accessing constructor property of null or undefined instance are caught, and thus the function returns false.
 */
const instanceTypeOf = (data) => {
    try {
        const {instance, customTypeName} = data;

        // checks if either instance or customTypeName is undefined
        if (typeof instance === "undefined" || typeof customTypeName === "undefined") return false;
        return (instance.constructor.name.toString() === customTypeName.toString());

    } catch {
        return false;
    }
};
/**
 * @private
 * @description Exports the instanceTypeOf function.
 *              This function is meant for internal use within the module or package.
 */
exports = module.exports = {
    ...{instanceTypeOf}
};