"use strict";

const {customTypeOf} = require("./customTypeOf");
const {enumErrors} = require("./enumErrors");
const {populateProperties} = require("./populateProperties");
const {registerDefinition} = require("./customTypeInterfaceDefinition")

/**
 * Represents a customizable type interface for creating and handling custom object types.
 * This class includes several private methods and properties for managing custom type instances.
 *
 */
class CustomTypeInterface {
    /**
     * Constructs an instance of the CustomTypeInterface.
     * @constructor
     * @memberof module:CustomTypeInterfaceModule
     */
    constructor() {
        /**
         * @private
         * @type {SymbolConstructor}
         * @name customType
         * @memberof CustomTypeInterface
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
         * @type {SymbolConstructor}
         * @name instanceOf
         * @memberof CustomTypeInterface
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
         * @memberof CustomTypeInterface
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
         * @description Populates the instance properties based on provided data.
         */
        Object.defineProperty(this, 'populate', {
            enumerable: false,
            configurable: false,
            /**
             * @function
             * @memberof CustomTypeInterface
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
             * @memberof CustomTypeInterface
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
             * @memberof CustomTypeInterface
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
             * @memberof CustomTypeInterface
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
             * @memberof CustomTypeInterface
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
             * @memberof CustomTypeInterface
             * @name immutable
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
             * @memberof CustomTypeInterface
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
     * @memberof CustomTypeInterface
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
 * Defines a custom behavior for the `instanceof` operator for this class.
 *
 * By defining this property using `Object.defineProperty`, the class can customize the behavior
 * of the `instanceof` operator. Specifically, this implementation checks if the constructor name
 * of an instance matches the `instanceOf` property of the instance, indicating that it is an instance
 * of `CustomTypeInterface`.
 *
 * @private
 * @ignore
 * @memberof CustomTypeInterface
 * @type {Symbol}
 */
Object.defineProperty(CustomTypeInterface, Symbol.hasInstance, {
    /**
     * Getter function for the custom `instanceof` behavior.
     *
     * @private
     * @function
     * @memberof CustomTypeInterface
     * @returns {function(*): boolean} A function that takes an instance and returns a boolean indicating
     * whether the instance's constructor name matches its `instanceOf` property.
     */
    get: () => (instance) => instance.constructor.name === instance.instanceOf
});

// Register the CustomTypeInterface class.
registerDefinition(CustomTypeInterface);

/**
 * Exports the CustomTypeInterface, its definitions, and the registerDefinition function.
 *
 * @private
 * @module CustomTypeInterfaceModule
 */
exports = module.exports = {
    ...{CustomTypeInterface}
}