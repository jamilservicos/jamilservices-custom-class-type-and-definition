"use strict";

const {validatesAndFilterFieldsTypes} = require("./validatesAndFilterFieldsTypes");

/**
 * Populates the properties of an instance with given data.
 *
 * This function utilizes `validatesAndFilterFieldsTypes` to validate and set fields on the instance
 * based on the provided data. It essentially acts as a wrapper around the `validatesAndFilterFieldsTypes`
 * function, making it specific to the task of populating instance properties.
 *
 * @function
 * @name populateProperties
 * @param {Object} instance - The instance whose properties are to be populated.
 * @param {Object} data - The data object containing the fields and values to be set on the instance.
 * @returns {boolean} Returns true if all fields are validated and set successfully, false otherwise.
 */
const populateProperties = (instance, data) => {
    return validatesAndFilterFieldsTypes(instance, data);
};
/**
* @private
* @description Exports the populateProperties function.
*              This function is intended for internal use within the module or package.
*/
exports = module.exports = {
    ...{populateProperties}
}