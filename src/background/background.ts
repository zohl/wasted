/// <reference path="../common/webextensions.d.ts"/>
/// <reference path="../common/common.d.ts"/>

let placeholder = () => {};

import * as log from '../common/log';

chrome.runtime.onMessage.addListener((() =>
  (message:Message, sender:any, response:any) => {

    if(message.type == 'focus') {
      log.start(message.hostname);
    }

    if(message.type == 'blur') {
      log.stop();
    }
  }
)());

