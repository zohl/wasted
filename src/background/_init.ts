/// <reference path="../common/webextensions.d.ts"/>
/// <reference path="../common/common.d.ts"/>

import * as log from '../common/log';
import {mkGroup} from '../common/group';

chrome.runtime.onMessage.addListener((() =>
  (message: Message, sender: any, response: any) => {

      let group = mkGroup(
            message.protocol
          , message.hostname
          , message.port
          , message.pathname);

      if(message.type == 'start') {
          log.start(group);
      }

      if(message.type == 'stop') {
          log.stop(group);
      }
  }
)());

