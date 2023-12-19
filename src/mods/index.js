"use strict";


const {CustomTypeInterface,
    CustomTypeInterfaceDefinition, registerDefinition} = require("./customTypeInterface");

/**
 * @private
 * @type {{registerDefinition: Function, CustomTypeInterfaceDefinition: Object, CustomTypeInterface: CustomTypeInterface|CustomTypeInterface}}
 */
exports = module.exports = {
    ...{CustomTypeInterface},
    ...{CustomTypeInterfaceDefinition},
    ...{registerDefinition}
};