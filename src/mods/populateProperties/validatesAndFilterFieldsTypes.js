"use strict";

const {filterItems} = require("./filterItems");

/**
 * Checks if any item in the array has an error field.
 *
 * This helper function is used within `validatesAndFilterFieldsTypes` to determine if any
 * of the items in the provided array contains an error field, which indicates a validation error.
 * @private
 * @memberof module:CustomTypeInterfaceModule
 * @type {Function}
 * @name checkRequiredFieldError
 * @param {Array} arrayItems - The array of items to be checked for errors.
 * @returns {boolean} Returns true if any item has an error field, false otherwise.
 */
const checkRequiredFieldError = (arrayItems) => {
    return arrayItems.find((r) => {
        if (r) {
            if (r.error) return true;
        }
    });
};
/**
 * Validates and filters field types for a given instance based on its interface model,
 * and sets the validated fields on the instance.
 *
 * This function validates each field in the provided data against the instance's interface model
 * using `filterItems`. It then sets the valid fields on the instance using the `setField` method of the instance.
 * If any required fields are missing or if any errors occur during the process, the function returns false.
 *
 * @function
 * @memberof module:CustomTypeInterfaceModule
 * @name validatesAndFilterFieldsTypes
 * @param {Object} instance - The instance whose fields are to be validated and set.
 * @param {Object} instance.interface - The interface model of the instance for validation.
 * @param {Function} instance.setField - The method used to set a field on the instance.
 * @param {Object} data - The data object containing the fields to be validated and set on the instance.
 * @returns {boolean} Returns true if all validations pass and fields are set successfully, false otherwise.
 */
const validatesAndFilterFieldsTypes = (instance, data) => {
    try {
        const model = instance.interface;
        const fields = Object.keys(model);
        return filterItems({fields, data, model}, (arrayItems) => {
            if (checkRequiredFieldError(arrayItems)) {
                return false;
            } else {
                for (let i = (arrayItems.length - 1); i >= 0; i--) {
                    const item = arrayItems[i];
                    if (item) instance.setField(item);
                    if (i === 0) return true;
                }
            }
        });
    } catch (e){
        return false;
    }
};
/**
 *
 * Exports the validatesAndFilterFieldsTypes function. This function is intended for internal use within the module or package.
 *
 * @private
 */
exports = module.exports = {
    ...{validatesAndFilterFieldsTypes}
}