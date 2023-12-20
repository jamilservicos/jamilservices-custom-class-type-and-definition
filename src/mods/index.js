"use strict";


const {
    CustomTypeInterface
} = require("./customTypeInterface");
const {
    CustomTypeInterfaceDefinition,
    registerDefinition
} = require("./customTypeInterfaceDefinition");

/**
 * This module exports the CustomTypeInterface class, its associated definitions,
 * and the registerDefinition function. These exports are primarily used for creating
 * and managing custom type interfaces within your application.
 *
 * @memberof module:CustomClassTypeAndDefinition
 * @private
 */
exports = module.exports = {
    /**
     * @private
     * @type {CustomTypeInterface}
     * @description Exports the CustomTypeInterface class. This class is used for creating custom type
     * instances with predefined properties and methods.
     */
    ...{CustomTypeInterface},
    /**
     * @private
     * @type {Object}
     * @description Exports the CustomTypeInterfaceDefinition object. This object stores and manages
     * the definitions for custom type interfaces.
     */
    ...{CustomTypeInterfaceDefinition},
    /**
     * @private
     * @type {Function}
     * @description Exports the registerDefinition function. This function is used to register new
     * custom type definitions to the CustomTypeInterfaceDefinition object.
     */
    ...{registerDefinition}
};
