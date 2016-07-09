/// <reference path="../common/webextensions.d.ts"/>
/// <reference path="../common/common.d.ts"/>

let placeholder = () => {};

var sendMessage = (messageType: MessageType) => () => {

  let message:Message = {
    type:     messageType
  , protocol: window.location.protocol
  , hostname: window.location.hostname
  , port:     window.location.port
  , pathname: window.location.pathname
  };

  chrome.runtime.sendMessage(message);
};


window.addEventListener('focus', sendMessage('focus'));
window.addEventListener('blur', sendMessage('blur'));
