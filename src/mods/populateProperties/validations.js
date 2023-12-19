"use strict";

/**
 * @name validations
 * @param {Object} schema
 * @returns {undefined|{}|{error: string, required: number}}
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
 * @private
 * @type {{validations: function(Object): ({name: string, value: *}|{error: string, required: number})}}
 */
exports = module.exports = {
    ...{validations}
};