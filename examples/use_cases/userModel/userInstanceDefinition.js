"use strict";

const {UserTestModel} = require("../../../src/main").CustomTypeInterfaceDefinition;
const testUserCustomTypeDefinition = (user) => {
    try {
        console.log("user instanceof UserTestModel from userInstanceDefinition", user instanceof UserTestModel);
    } catch (err) {
        console.log(err);
    }
    return true;
};

exports = module.exports = testUserCustomTypeDefinition;
