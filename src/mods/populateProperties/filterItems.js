"use strict";

const {validations} = require("./validations");

/**
 * Filters and validates items based on a given model and data.
 *
 * The function iterates over each field specified in the 'fields' array, validates it against the provided
 * model using the `validations` function, and then accumulates these validation results. Once all fields
 * are processed, the accumulated results are passed to a callback function.
 *
 * The function handles potential exceptions during the validation process and returns an empty array in case of an error.
 *
 * @function
 * @name filterItems
 * @param {Object} obj - The object containing fields, data, and model for validation.
 * @param {Array.<string>} obj.fields - Array of field names to be validated.
 * @param {Object} obj.data - The data object containing values of the fields to be validated.
 * @param {Object} obj.model - The model object defining the expected type and requirements for each field.
 * @param {Function} done - The callback function to which the array of validation results will be passed.
 * @returns {Object} The function returns the result of the `done` callback with the validation results or an empty array in case of an error.
 */
const filterItems = (obj, done) => {
    const prepareItems = [];
    const {fields, data, model} = obj;
    for (let i = (fields.length - 1); i >= 0; i--) {
        try {
            const item = fields[i];
            if (item) {
                const schema = {
                    required: undefined,
                    model: model[item],
                    value: data[item],
                    type: model[item]
                };
                if (typeof schema.model === "object") {
                    const {type, required} = schema.model;
                    if (type) schema.type = type;
                    schema.required = required;
                }
                const validationsObject = validations({...schema, item});
                prepareItems.push(validationsObject);
            }
            if (i === 0) {
                //console.log(prepareItems)
                return done(prepareItems);
            }
        } catch {
            return [];
        }
    }
};
/**
 * @private
 * @description Exports the filterItems function.
 *              This function is intended for internal use within the module or package.
 */
exports = module.exports = {
    ...{filterItems}
}