"use strict";

const {filterItems} = require("./filterItems");

const checkRequiredFieldError = (arrayItems) => {
    return arrayItems.find((r) => {
        if (r) {
            if (r.error) return true;
        }
    });
};
/**
 * @name validatesAndFilterFieldsTypes
 * @param {Object} instance
 * @param {Object} data
 * @returns {boolean}
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
 * @private
 * @type {{validatesAndFilterFieldsTypes: function(Object, Object): boolean}}
 */
exports = module.exports = {
    ...{validatesAndFilterFieldsTypes}
}