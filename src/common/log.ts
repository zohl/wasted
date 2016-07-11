/// <reference path="webextensions.d.ts"/>
/// <reference path="common.d.ts"/>
/// <reference path="group.d.ts"/>

import * as promise from './promise';
import * as storage from './storage';


let prefix: string = 'wasted';

let start = (group: Group) => storage.modify(prefix, (data: any) => {
    storage.ensure(data, 'log', []);

    let entry = data.log.pop();
    let newEntry = {
          timestamp: Date.now()
        , group    : group
        , duration : 0
        , ongoing  : true
    };

    if (entry == undefined || !entry.ongoing) {
        // Adding new entry
        if (entry) {
            data.log.push(entry);
        }

        data.log.push(newEntry);
    }
    else {
        if (entry.group.name != group.name) {
            // Discarding old entry and adding new one
            console.log(
                  'log::start: two successive start messages are inconsistent'
                , entry.group.name
                , entry.name);

            data.log.push(newEntry);
        }
        else {
            // Updating existing entry
            entry.duration = Date.now() - entry.timestamp;
            data.log.push(entry);
        }
    }

    return data;
});


let stop = (group: Group) => storage.modify(prefix, (data: any) => {

    let entry = data.log.pop();

    if (entry == undefined || !entry.ongoing) {
        // Discarding new entry
        console.log('log::stop: stop message without pair');
    }
    else {
        // Finishing entry
        entry.duration = Date.now() - entry.timestamp;
        entry.ongoing = false;

        if (entry.group.name != group.name) {
            // Discarding new entry and finishing existing one instead
            console.log(
                  'log::stop: start and stop messages are inconsistent'
                , group.name
                , entry.group.name);
        }

        data.log.push(entry);
    }

    return data;
});


let clear = () => storage.modify(prefix, (data: any) => {
    data.log = [];
    return data;
});


let query = () => promise.fmap((data:any) => {
    storage.ensure(data, 'log', []);
    return data.log;
})(storage.read(prefix));


export {start, stop, clear, query};

