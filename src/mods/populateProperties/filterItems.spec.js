"use strict";

const chai = require('chai');
const {  assert, expect} = chai;

const {filterItems} = require("./filterItems");

const objTest = {
    fields: [
        'first_name',
        'last_name',
        'password',
        'email',
        'city',
        'state',
        'address'
    ],
    data: {
        first_name: 'User Test First Name',
        last_name: 'User Test Last Name',
        password: 'UserPassword',
        email: 'usertest@test.local'
    },
    model: {
        first_name: { type: 'string', required: true },
        last_name: { type: 'string', required: true },
        password: { type: 'string', required: true },
        email: { type: 'string', required: true },
        city: 'string',
        state: 'string',
        address: 'string'
    }
};
const test = filterItems(objTest, r => r);
describe('filterItems tests', () => {
    it('typeof filterItems === function', () => {
        assert.isFunction(filterItems);
    });
    it('filterItems(objTest, r => r) result is array?', () => {
        expect(test).to.be.a('array');
    });
});