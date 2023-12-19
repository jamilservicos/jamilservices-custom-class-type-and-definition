"use strict";

const {customTypeOf} = require("./customTypeOf");
const {enumErrors} = require("./enumErrors");
const {populateProperties} = require("./populateProperties");

/**
 * @class CustomTypeInterface
 * @description Represents a customizable type interface for creating and handling custom object types.
 * This class includes several private methods and properties for managing custom type instances.
 */
class CustomTypeInterface {
    /**
     * Constructs an instance of the CustomTypeInterface.
     */
    constructor() {
        /**
         * @private
         * @description Custom type of the object, typically the name of the class.
         */
        Object.defineProperty(this, 'customType', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: new.target.name
        });
        /**
         * @private
         * @description Name of the instance type, typically the name of the class.
         */
        Object.defineProperty(this, 'instanceOf', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: new.target.name
        });
        /**
         * @private
         * @name interface
         * @type {Object}
         * @description Interface definitions for the custom type.
         */
        Object.defineProperty(this, 'interface', {
            enumerable: false,
            configurable: false,
            writable: true,
            value: {}
        });
        /**
         * @private
         * @name required
         * @type {Array.<string>}
         * @description List of required property names for the custom type instance.
         */
        Object.defineProperty(this, 'required', {
            enumerable: false,
            configurable: false,
            value: []
        });
        /**
         * @private
         * @description Populates the instance properties based on provided data.
         */
        Object.defineProperty(this, 'populate', {
            enumerable: false,
            configurable: false,
            /**
             * @function
             * @name populate
             * @param {Object} data - The data to populate the instance properties with.
             * @returns {boolean} Returns true if properties are successfully populated, false otherwise.
             */
            value: (data) => {
                return populateProperties(this, data);
            }
        });
        /**
         * @private
         * @description Checks if the instance is of a specified custom type.
         */
        Object.defineProperty(this, 'typeOf', {
            enumerable: false,
            configurable: false,
            /**
             * @function
             * @name typeOf
             * @param {string} customTypeName - The name of the custom type to check against.
             * @returns {boolean} Returns true if the instance matches the custom type, false otherwise.
             */
            value: (customTypeName) => {
                try {
                    const instance = this;
                    if (customTypeOf({instance, customTypeName, enumErrors})) return true;
                } catch {
                }
                return false;
            }
        });
        /**
         * @private
         * @description Converts the instance to a plain object.
         */
        Object.defineProperty(this, 'toObject', {
            enumerable: false,
            configurable: false,
            /**
             * @function
             * @name toObject
             * @returns {Object} Returns a plain object representation of the instance.
             */
            value: () => {
                return {...this};
            }
        });
        /**
         * @private
         * @description Converts the instance to a JSON string.
         */
        Object.defineProperty(this, 'toJson', {
            enumerable: false,
            configurable: false,
            /**
             * @function
             * @name toJson
             * @returns {string} Returns a JSON string representation of the instance.
             */
            value: () => {
                return JSON.stringify(this.toObject());
            }
        });
        /**
         * @private
         * @description Overrides the default toString method to return a JSON string representation of the instance.
         */
        Object.defineProperty(this, 'toString', {
            enumerable: false,
            configurable: false,
            /**
             * @function
             * @name toString
             * @returns {string} Returns a JSON string representation of the instance.
             */
            value: () => {
                return this.toJson();
            }
        });
        //
        /**
         * @private
         * @description Makes the instance immutable (frozen).
         */
        Object.defineProperty(this, 'immutable', {
            enumerable: false,
            configurable: false,
            /**
             * @function
             * @name immutable             *
             * @param {Object} instance - The instance to be made immutable.
             * @returns {Boolean|undefined}
             */
            value: (instance) => {
                if(instance) {
                    if (!Object.isFrozen(instance)) {
                        Object.freeze(instance);
                    }
                    return true;
                }
            }
        });
        /**
         * @private
         * @description Sets a field in the instance based on the defined interface.
         */
        Object.defineProperty(this, 'setField', {
            enumerable: false,
            configurable: false,
            /**
             * @function
             * @name setField
             * @param {Object} data - Contains the name and value of the field to be set.
             */
            value: (data) => {
                try {
                    const {name, value} = data;
                    if (name && value) {
                        if (((typeof this.interface[name] === "string")
                                && (typeof value === this.interface[name]))
                            || ((typeof this.interface[name] === "object")
                                && (this.interface[name].type)
                                && (typeof value === this.interface[name].type))) {
                            this[name] = value;
                        }
                    }
                } catch {}
            }
        });
    }
    /**
     * @function
     * @name getField
     * @description Retrieves a field value from the instance.
     * @param {string} key - The key of the field to retrieve.
     * @returns {*} The value of the field, or undefined if the field does not exist.
     */
    getField(key) {
        if (key && this[key]) return this[key];
        return undefined;
    }
}
/**
 * @private
 * @description Defines a custom behavior for the instanceof operator for this class.
 */
Object.defineProperty(CustomTypeInterface, Symbol.hasInstance, {
    /**
     * @private
     * @returns {function(*): boolean}
     */
    get: () => (instance) => instance.constructor.name === instance.instanceOf
});
/**
 * @name CustomTypeInterfaceDefinition
 * @type {{resolveDefinition: Object, registerDefinition: Function}}
 * @description Manages definitions of custom type interfaces.
 */
const CustomTypeInterfaceDefinition = {
    /**
     * @protected
     * @name resolveTypeDefinition
     * @type {Object}
     * @description Stores resolved definitions for custom types.
     */
    resolveTypeDefinition: {},
    /**
     * @function
     * @name registerTypeDefinition
     * @description Registers a new custom type definition.
     * @param {Object} resolveDefinition - The definition object of the custom type.
     * @throws {Error} If a definition with the same name already exists.
     */
    registerTypeDefinition: (resolveDefinition) => {
        const {name} = resolveDefinition;
        if(CustomTypeInterfaceDefinition.resolveTypeDefinition[name]) {
            throw new Error("definition for class with the same name already exists");
        } else CustomTypeInterfaceDefinition.resolveTypeDefinition[name] = resolveDefinition;
    }
};
// Register the CustomTypeInterface class.
CustomTypeInterfaceDefinition.registerDefinition(CustomTypeInterface);
/**
 * @private
 * @description Exports the CustomTypeInterface, its definitions, and the registerDefinition function.
 */
exports = module.exports = {
    CustomTypeInterface,
    CustomTypeInterfaceDefinition: CustomTypeInterfaceDefinition.resolveTypeDefinition,
    registerDefinition: CustomTypeInterfaceDefinition.registerTypeDefinition
}