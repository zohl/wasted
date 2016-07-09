/// <reference path="webextensions.d.ts"/>

import * as promise from './promise';


let read = (prefix: string): Promise<any> =>
  new Promise((response, reject) => {

      chrome.storage.local.get(prefix, (data: any) => {
      if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
          reject();
      }
      else {
          let result = data;
          if (result === undefined || !(prefix in result)) {
              result = {};
              result[prefix] = {};
          }
          response(result);
      }
    });
  });


let modify = (prefix: string, f: (data: any) => any) =>
    promise.bind(read(prefix), (data: any) => new Promise((response:() => void, reject:() => void) => {

        data[prefix] = f(data[prefix]);

        chrome.storage.local.set(data, () => {
            if(chrome.runtime.lastError) {
                reject();
            }
            else {
                response();
            }
        });
    }));


let ensure = (data: any, key: string, value = {}) => {
    if (!(key in data)) {
        data[key] = value;
    }
    return data;
};

export {read, modify, ensure};

