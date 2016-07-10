/// <reference path="webextensions.d.ts"/>

import * as promise from './promise';


let read = (prefix: string): Promise<any> =>
  new Promise((response, reject) => {

      chrome.storage.local.get(prefix, (result: any) => {
      if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
          reject();
      }
      else {
          response((result !== undefined && prefix in result) ? result[prefix] : {});
      }
    });
  });


let modify = (prefix: string, f: (data: any) => any) =>
    promise.bind(read(prefix), (data: any) => new Promise((response:() => void, reject:() => void) => {
        let result:any = {};
        result[prefix] = f(data);

        chrome.storage.local.set(result, () => {
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

