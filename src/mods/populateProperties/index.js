"use strict";

const {validatesAndFilterFieldsTypes} = require("./validatesAndFilterFieldsTypes");

/**
 * @name populateProperties
 * @param {Object} instance
 * @param {Object} data
 * @returns {boolean}
 */
const populateProperties = (instance, data) => {
    return validatesAndFilterFieldsTypes(instance, data);
};
/**
 * @private
 * @type {{populateProperties: function(Object, Object): boolean}}
 */
exports = module.exports = {
    ...{populateProperties}
}