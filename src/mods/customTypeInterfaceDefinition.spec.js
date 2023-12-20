"use strict";

const chai = require('chai');
const {  assert} = chai;
const {CustomTypeInterfaceDefinition, registerDefinition} = require("./customTypeInterfaceDefinition");
const {CustomTypeInterface} = require("./customTypeInterface");

const UserTestModelSettings = {
    immutable: true, // When activated, you will not be able to change the instance while it exists. irreversible
    interface: {
        fields: {
            name: {
                type: "string",
                required: true
            },
            stringTest: "string",
            numberTest: "number",
            objectTest: "object",
        }
    }
};
class UserTestModel extends CustomTypeInterface {
    name;
    stringTest;
    numberTest;
    objectTest;
    constructor(data) {
        super();
        this.interface = UserTestModelSettings.interface.fields;
        if (data) this.populate(data);
        // settings
        if(UserTestModelSettings.immutable) this.immutable(this);
    }
}

registerDefinition(UserTestModel);
describe('registerDefinition and CustomTypeInterfaceDefinition tests', () => {
    it('CustomTypeInterfaceDefinition have UserTestModel?',() => {
        CustomTypeInterfaceDefinition.should.contain.keys(["UserTestModel"]);
    });
    it('typeof CustomTypeInterfaceDefinition.UserTestModel === function',() => {
        const {UserTestModel} = CustomTypeInterfaceDefinition;
        assert.isFunction(UserTestModel);
    });
});