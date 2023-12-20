"use strict";

/**
 * Manages definitions of custom type interfaces.
 *
 * This object is responsible for storing and managing custom type definitions. It provides
 * a mechanism to register new type definitions and ensure uniqueness of type names.
 *
 * @typedef {Object} CustomTypeInterfaceDefinition
 * @memberof module:CustomTypeInterfaceDefinitionModule
 * @property {Object.<string, SymbolConstructor>}  resolveTypeDefinition Stores resolved definitions for custom types.
 */
const CustomTypeInterfaceDefinition = {
    /**
     * Stores resolved definitions for custom types.
     *
     * This object acts as a registry for custom type definitions. Each key represents the name of a custom type,
     * and the associated value is the definition of that type.
     *
     * @protected
     * @type {Object.<string, SymbolConstructor>}
     */
    resolveTypeDefinition: {}
};

/**
 * Registers a new custom type definition.
 *
 * This function adds a new type definition to the `resolveTypeDefinition` registry. If a type with the same
 * name already exists, it throws an error to prevent duplicate definitions.
 *
 * @function
 * @memberof module:CustomTypeInterfaceDefinitionModule
 * @name registerTypeDefinition
 * @param {SymbolConstructor} resolveDefinition - Object containing the definition to register.
 * @param {string} resolveDefinition.name - Name of the custom type.
 * @throws {Error} If a definition with the same name already exists.
 */
const registerTypeDefinition = (resolveDefinition) => {
    const {name} = resolveDefinition;
    if(CustomTypeInterfaceDefinition.resolveTypeDefinition[name]) {
        //
        throw new Error("definition for class with the same name already exists");
    } else CustomTypeInterfaceDefinition.resolveTypeDefinition[name] = resolveDefinition;
};
/**
 * Exports the resolved type definitions from CustomTypeInterfaceDefinition and the registerTypeDefinition function.
 *
 * The CustomTypeInterfaceDefinition's resolveTypeDefinition property contains the stored custom type definitions,
 * while the registerTypeDefinition function is used to add new type definitions to the resolveTypeDefinition registry.
 *
 * @private
 * @module CustomTypeInterfaceDefinitionModule
 */
exports = module.exports = {
    ...{CustomTypeInterfaceDefinition: CustomTypeInterfaceDefinition.resolveTypeDefinition,},
    ...{registerDefinition: registerTypeDefinition}
};