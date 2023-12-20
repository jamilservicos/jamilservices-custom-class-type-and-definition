"use strict";

/**
 * Performs validation based on a given schema object.
 *
 * The function checks if the provided value in the schema matches the specified type.
 * If the required property is true and the value is undefined, it returns an error object.
 * Otherwise, it validates the type of the value and returns an object with the name and processed value.
 * If the value doesn't match the specified type or if other validation errors occur, the function returns undefined.
 *
 * @function
 * @memberof module:CustomTypeInterfaceModule
 * @name validations
 * @param {Object} schema - The schema object used for validation.
 * @param {string} schema.item - The name of the item being validated.
 * @param {boolean} [schema.required] - Indicates whether the item is required.
 * @param {*} schema.value - The value to be validated.
 * @param {string} schema.type - The expected type of the value ('string', 'number', etc.).
 * @returns {undefined|Object} Returns an object with 'name' and 'value' keys if validation is successful;
 *                             an error object with 'error' and 'required' keys if a required value is missing;
 *                             or undefined if the value does not match the expected type.
 */
const validations = (schema) => {
    const item = schema.item.toString();
    const result = {};
    if (schema.required && (typeof schema.value === "undefined")) return {error: item, required: 404};
    const value = schema.value;
    if (typeof value === schema.type) {
        result["name"] = item;
        result["value"] = value;
        if (schema.type === "string") result["value"] = value.toString();
        if (schema.type === "number") result["value"] = Number(value);
        return result;
    }
    return undefined;
};
/**
 *
 * Exports the validations function. This function is intended for internal use within the module or package.
 *
 * @private
 */
exports = module.exports = {
    ...{validations}
};