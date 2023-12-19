"use strict";

const {instanceTypeOf} = require("./instanceTypeOf");
const {validatesRequiredProperties} = require("./validatesRequiredProperties");

/**
 * @name customTypeOf
 * @function
 * @param {Object} data
 * @returns {boolean}
 */
const customTypeOf = (data) => {
    try {
        /**
         * @property {object|undefined} instance
         * @property {string|undefined} customTypeName
         * @property {object|undefined} enumErrors
         */
        const {instance, customTypeName, enumErrors} = data;
        if (instance.required.length === 0) return true;
        if ((instance && customTypeName && enumErrors) && (instanceTypeOf({instance, customTypeName}))) {
            const response = validatesRequiredProperties(instance, (r) => {
                if ((typeof r === "object") && (r["res"])) {
                    return true;
                } else enumErrors["CUSTOMTYPEERROR"](instance.customTypeName);
                return false;
            });
            if (response) return true;
        } else enumErrors["CUSTOMTYPEERROR"](instance.customTypeName);
    } catch {
    }
    return false;
};
/**
 * @private
 * @type {{customTypeOf: function(Object): boolean}}
 */
exports = module.exports = {
    ...{customTypeOf}
};