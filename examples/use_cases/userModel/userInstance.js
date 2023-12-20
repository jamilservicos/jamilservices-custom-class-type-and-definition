"use strict";

const {CustomTypeInterface, registerDefinition} = require("../../..");

const UserTestModelSettings = {
    immutable: false, // When activated, you will not be able to change the instance while it exists. irreversible
    interface: {
        fields: {
            first_name: {
                type: "string",
                required: true
            },
            last_name: {
                type: "string",
                required: true
            },
            password: {
                type: "string",
                required: true
            },
            email: {
                type: "string",
                required: true
            },
            city: "string",
            state: "string",
            address: "string"
        }
    }
};

class UserTestModel extends CustomTypeInterface {
    first_name;
    last_name;
    password;
    email;
    city;
    state;
    address;
    constructor(data) {
        super();
        this.interface = UserTestModelSettings.interface.fields;
        if (data) this.populate(data);
        // settings
        if(UserTestModelSettings.immutable) this.immutable(this);
    }
}
registerDefinition(UserTestModel);
const user = new UserTestModel({
    first_name: "User Test First Name",
    last_name: "User Test Last Name",
    password: "UserPassword",
    email: "usertest@test.local"
});

console.log("instance", user);
console.log("instance.toJson()", user.toJson());
console.log("instance.toObject()", user.toObject());
console.log("instance.typeOf('UserTestModel')", user.typeOf('UserTestModel'));
console.log("user instanceof UserTestModel", user instanceof UserTestModel);
console.log("user.customType === 'UserTestModel'", user.customType === 'UserTestModel');
console.log("user.instanceOf === user.customType", user.instanceOf === user.customType);
console.log("user.interface", user.interface);

const userInstanceDefinition = require("./userInstanceDefinition");
console.log("userInstanceDefinition(user)", userInstanceDefinition(user));
