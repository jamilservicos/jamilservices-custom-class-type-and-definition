"use strict";

const {instanceTypeOf} = require("./instanceTypeOf");
const {validatesRequiredProperties} = require("./validatesRequiredProperties");

/**
 * A custom type checking function.
 *
 * This function performs validation on an input data object by checking its instance properties,
 * custom type name, and error enumeration logic. It relies on `instanceTypeOf` and
 * `validatesRequiredProperties` functions to perform these validations. The function ensures
 * that the instance has the required properties and matches the specified custom type name.
 * If the validation fails, it triggers a custom type error.
 *
 * @function
 * @name customTypeOf
 * @memberof module:CustomTypeInterfaceModule
 * @param {Object} data - An object containing properties to be validated.
 * @param {Object} data.instance - The instance of the object being validated.
 * @param {string} data.customTypeName - The custom type name for the current instance.
 * @param {Object} data.enumErrors - Function to retrieve an object for enumerating errors.
 * @returns {boolean} Returns `true` if the validation passes or `false` if it fails.
 */
const customTypeOf = (data) => {
    try {
        const {instance, customTypeName, enumErrors} = data;

        if (instance.required.length === 0) return true;

        if ((instance && customTypeName && enumErrors) && instanceTypeOf({instance, customTypeName})) {
            const response = validatesRequiredProperties(instance, (r) => {
                if ((typeof r === "object") && (r["res"])) {
                    return true;
                } else {
                    enumErrors["CUSTOMTYPEERROR"](instance.customTypeName);
                    return false;
                }
            });

            if (response) return true;
        } else {
            enumErrors["CUSTOMTYPEERROR"](instance.customTypeName);
        }
    } catch {}
    return false;
};
/**
 *
 * Exports the customTypeOf function. This function is intended for internal use within the module or package.
 *
 * @private
 */
exports = module.exports = {
    ...{customTypeOf}
};