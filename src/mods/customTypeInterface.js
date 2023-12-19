"use strict";

const {customTypeOf} = require("./customTypeOf");
const {enumErrors} = require("./enumErrors");
const {populateProperties} = require("./populateProperties");

/**
 * @class CustomTypeInterface
 */
class CustomTypeInterface {
    /**
     * @constructor
     */
    constructor() {
        /**
         * @private
         */
        Object.defineProperty(this, 'customType', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: new.target.name
        });
        /**
         * @private
         */
        Object.defineProperty(this, 'instanceOf', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: new.target.name
        });
        /**
         * @private
         */
        Object.defineProperty(this, 'interface', {
            enumerable: false,
            configurable: false,
            writable: true,
            value: {}
        });
        /**
         * @private
         */
        Object.defineProperty(this, 'required', {
            enumerable: false,
            configurable: false,
            value: []
        });
        /**
         * @private
         */
        Object.defineProperty(this, 'populate', {
            enumerable: false,
            configurable: false,
            /**
             * @name populate
             * @function
             * @param {Object} data
             * @returns {boolean}
             */
            value: (data) => {
                return populateProperties(this, data);
            }
        });
        /**
         * @private
         */
        Object.defineProperty(this, 'typeOf', {
            enumerable: false,
            configurable: false,
            /**
             * @name typeOf
             * @function
             * @param {string} customTypeName
             * @returns {boolean}
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
         */
        Object.defineProperty(this, 'toObject', {
            enumerable: false,
            configurable: false,
            /**
             * @name toObject
             * @function
             * @returns {Object}
             */
            value: () => {
                return {...this};
            }
        });
        /**
         * @private
         */
        Object.defineProperty(this, 'toJson', {
            enumerable: false,
            configurable: false,
            /**
             * @name toJson
             * @returns {string}
             */
            value: () => {
                return JSON.stringify(this.toObject());
            }
        });
        //
        Object.defineProperty(this, 'toString', {
            enumerable: false,
            configurable: false,
            /**
             * @name toString
             * @returns {string}
             */
            value: () => {
                return this.toJson();
            }
        });
        //
        /**
         * @private
         */
        Object.defineProperty(this, 'immutable', {
            enumerable: false,
            configurable: false,
            /**
             * @name immutable
             * @function
             * @param instance
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
         */
        Object.defineProperty(this, 'setField', {
            enumerable: false,
            configurable: false,
            /**
             * @name setField
             * @param {Object} data
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
     * @name getField
     * @param {string} key
     * @returns {undefined|*}
     */
    getField(key) {
        if (key && this[key]) return this[key];
        return undefined;
    }
}
/**
 * @private
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
 */
const CustomTypeInterfaceDefinition = {
    /**
     * @name resolveDefinition
     * @private
     * @type {Object}
     */
    resolveDefinition: {},
    /**
     * @name registerDefinition
     * @type {Function}
     * @param {Object} resolveDefinition
     */
    registerDefinition: (resolveDefinition) => {
        const {name} = resolveDefinition;
        if(CustomTypeInterfaceDefinition.resolveDefinition[name]) {
            throw new Error("definition for class with the same name already exists");
        } else CustomTypeInterfaceDefinition.resolveDefinition[name] = resolveDefinition;
    }
};
CustomTypeInterfaceDefinition.registerDefinition(CustomTypeInterface);
/**
 * @private
 * @type {{registerDefinition: Function, CustomTypeInterfaceDefinition: Object, CustomTypeInterface: CustomTypeInterface}}
 */
exports = module.exports = {
    CustomTypeInterface,
    CustomTypeInterfaceDefinition: CustomTypeInterfaceDefinition.resolveDefinition,
    registerDefinition: CustomTypeInterfaceDefinition.registerDefinition
}