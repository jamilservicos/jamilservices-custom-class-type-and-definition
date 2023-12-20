"use strict";

const chai = require('chai');
const { assert} = chai;
const { instanceTypeOf } = require("./instanceTypeOf");

describe('instanceTypeOf and modulo imports', () => {
  it('should define instanceTypeOf function', () => {
    assert.isFunction(instanceTypeOf);
  });
});