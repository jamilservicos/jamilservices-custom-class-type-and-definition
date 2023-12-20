"use strict";

const chai = require('chai');
const {  assert, expect} = chai;
const should = chai.should();
const {CustomTypeInterface} = require("./customTypeInterface");

//=======
let userTest;
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
//=======
describe('CustomTypeInterface import tests', () => {
    //
    it('userTest = new UserTestModel', () => {
        userTest = new UserTestModel({
            name: "User Test",
            stringTest: "stringTest",
            numberTest: 123,
            objectTest: {}
        });
        assert.isObject(userTest);
    });

    it('userTest have toJson?', () => {
        userTest.should.have.property("toJson");
    });
    it('userTest have toObject?', () => {
        userTest.should.have.property("toObject");
    });
    it('userTest have typeOf?', () => {
        userTest.should.have.property("typeOf");
    });
    it('userTest have customType?', () => {
        userTest.should.have.property("customType");
    });
    it('userTest have instanceOf?', () => {
        userTest.should.have.property("instanceOf");
    });
    it('userTest have interface?', () => {
        userTest.should.have.property("interface");
    });

    it('typeof userTest === object', () => {
        assert.isObject(userTest);
    });
    it('userTest instanceof UserTestModel', () => {
        assert.isBoolean(userTest instanceof UserTestModel);
    });
    //
    it('typeof userTest.toJson() === string', () => {
        assert.isString(userTest.toJson());
    });
    it('typeof userTest.toObject() === object', () => {
        assert.isObject(userTest.toObject());
    });
    it('typeof userTest.typeOf("UserTestModel") === boolean', () => {
        assert.isBoolean(userTest.typeOf('UserTestModel'));
    });
    it('userTest.customType === "UserTestModel"', () => {
        assert.isBoolean(userTest.customType === "UserTestModel");
    });
    it('userTest.instanceOf === userTest.customType', () => {
        assert.isBoolean(userTest.instanceOf === userTest.customType);
    });
    //
    it('typeof userTest.interface === object', () => {
        assert.isObject(userTest.interface);
    });
    it('typeof userTest.interface.name === object', () => {
        assert.isObject(userTest.interface.name);
    });
    it('typeof userTest.interface.name.type === string', () => {
        assert.isString(userTest.interface.name.type);
    });
    it('typeof userTest.interface.name.required === boolean', () => {
        assert.isBoolean(userTest.interface.name.required);
    });
    it('typeof userTest.interface.stringTest === string', () => {
        assert.isString(userTest.interface.stringTest);
    });
    it('typeof userTest.interface.numberTest === string', () => {
        assert.isString(userTest.interface.numberTest);
    });
    it('typeof userTest.interface.objectTest === string', () => {
        assert.isString(userTest.interface.objectTest);
    });
    //
    it('typeof userTest.toObject().name === string', () => {
        assert.isString(userTest.toObject().name);
    });
    it('typeof userTest.toObject().stringTest === string', () => {
        assert.isString(userTest.toObject().stringTest);
    });
    it('typeof userTest.toObject().numberTest === number', () => {
        assert.isNumber(userTest.toObject().numberTest);
    });
    it('typeof userTest.toObject().objectTest === object', () => {
        assert.isObject(userTest.toObject().objectTest);
    });
});
//=======