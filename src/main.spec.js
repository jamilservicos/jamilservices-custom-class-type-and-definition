"use strict";
const chai = require('chai');
const {  assert} = chai;
const should = chai.should();

const mainTest = require("./main");

describe('mainTest imports', () => {
    it('typeof mainTest === object', () => {
        assert.isObject(mainTest);
    });

    it('mainTest have UserTestModel?', () => {
        mainTest.should.contain.keys(["CustomTypeInterface"]);
    });
    it('mainTest have CustomTypeInterfaceDefinition?', () => {
        mainTest.should.contain.keys(["CustomTypeInterfaceDefinition"]);
    });
    it('mainTest have CustomTypeInterfaceDefinition?', () => {
        mainTest.should.contain.keys(["registerDefinition"]);
    });

    it('typeof mainTest.CustomTypeInterface === function', () => {
        assert.isFunction(mainTest.CustomTypeInterface);
    });
    it('typeof mainTest.CustomTypeInterfaceDefinition === object', () => {
        assert.isObject(mainTest.CustomTypeInterfaceDefinition);
    });
    it('typeof mainTest.registerDefinition === function', () => {
        assert.isFunction(mainTest.registerDefinition);
    });
});


