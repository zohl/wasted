/// <reference path="webextensions.d.ts"/>
/// <reference path="common.d.ts"/>

import * as promise from './promise';
import * as storage from './storage';


let prefix: string = 'wasted';

let start = (group: Group) => storage.modify(prefix, (data: any) => {
    storage.ensure(data, 'log', []);
    data.log.push({timestamp: Date.now(), group: group, duration: 1});
    return data;
});

let stop = () => storage.modify(prefix, (data: any) => {
  data.log.push({timestamp: Date.now(), group: 'end', duration: 1});
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

