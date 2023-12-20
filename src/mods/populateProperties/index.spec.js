"use strict";

const chai = require('chai');
const {  assert, expect} = chai;

const {populateProperties} = require("./index");
const {CustomTypeInterface} = require("../customTypeInterface");

const objTest = {
    name: "User Test",
    stringTest: "stringTest",
    numberTest: 123,
    objectTest: {}
};
//=======
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
const userTest = new UserTestModel();
//=======
describe('populateProperties  imports', () => {
    it('typeof populateProperties === function', () => {
        assert.isFunction(populateProperties);
    });
    it('typeof populateProperties === boolean', () => {
        assert.isBoolean(populateProperties(userTest, objTest));
    });
    it('populateProperties === true', () => {
        expect(populateProperties(userTest, objTest)).to.be.true;
    });
});


