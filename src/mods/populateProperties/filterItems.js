"use strict";

const {validations} = require("./validations");

/**
 * @name filterItems
 * @param {Object} obj
 * @param {Function} done callback function
 * @returns {Object}
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
 */
exports = module.exports = {
    ...{filterItems}
}