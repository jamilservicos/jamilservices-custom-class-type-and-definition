"use strict";
const chai = require('chai');
const {  assert} = chai;
const should = chai.should();

const indexModsTest = require("./index");

describe('indexModsTest imports', () => {
    it('typeof indexModsTest === object', () => {
        assert.isObject(indexModsTest);
    });

    it('indexModsTest have UserTestModel?', () => {
        indexModsTest.should.contain.keys(["CustomTypeInterface"]);
    });
    it('indexModsTest have CustomTypeInterfaceDefinition?', () => {
        indexModsTest.should.contain.keys(["CustomTypeInterfaceDefinition"]);
    });
    it('indexModsTest have CustomTypeInterfaceDefinition?', () => {
        indexModsTest.should.contain.keys(["registerDefinition"]);
    });

    it('typeof indexModsTest.CustomTypeInterface === function', () => {
        assert.isFunction(indexModsTest.CustomTypeInterface);
    });
    it('typeof indexModsTest.CustomTypeInterfaceDefinition === object', () => {
        assert.isObject(indexModsTest.CustomTypeInterfaceDefinition);
    });
    it('typeof indexModsTest.registerDefinition === function', () => {
        assert.isFunction(indexModsTest.registerDefinition);
    });
});


