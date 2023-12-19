"use strict";

const process = require('node:process');
const fs = require('fs');
const path = require('path');

const results = [];

const {CustomTypeInterface} = require('.');

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
            address: "string"
        }
    }
};
class UserTestModel extends CustomTypeInterface {
    first_name;
    last_name;
    password;
    email;
    // noinspection JSUnusedGlobalSymbols
    address;
    constructor(data) {
        super();
        this.interface = UserTestModelSettings.interface.fields;
        if (data) this.populate(data);
        // settings
        if(UserTestModelSettings.immutable) this.immutable(this);
    }
}
const data = {
    first_name: "User Test First Name",
    last_name: "User Test Last Name",
    password: "UserPassword",
    email: "usertest@test.local"
};

//
const formatBytes = function (bytes, precision) {
    const kilobyte = 1024
    const megabyte = kilobyte * 1024
    const gigabyte = megabyte * 1024
    const terabyte = gigabyte * 1024

    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B   '
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + ' KB  '
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + ' MB  '
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + ' GB  '
    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + ' TB  '
    } else {
        return bytes + ' B   '
    }
}
const count = 100000;

const starttime = performance.now();
const memoryUsageBefore = process.memoryUsage();
for (let i = (count - 1); i >= 0; i--) {
    const obj = new UserTestModel(data);
    obj.toJson();
    obj["toString"]();
    obj.toObject();
    obj.typeOf("UserTestModel");
}
const endtime = performance.now();

const memoryUsageAfter = process.memoryUsage();
const usedMemory = formatBytes(memoryUsageAfter.heapUsed - memoryUsageBefore.heapUsed);
console.log(`Memória utilizada: ${usedMemory} `);
console.log(`Quantidade de loops: ${count} `);
console.log(`Tempo consumido: ${(endtime - starttime) +" ms"} `);

results.push(`Memória utilizada: ${usedMemory}`);
results.push(`Quantidade de loops: ${count}`);
results.push(`Tempo consumido: ${(endtime - starttime) +" ms"}`);

fs.writeFileSync(path.join(__dirname, 'benchmark-results.txt'), results.join('\n'));
