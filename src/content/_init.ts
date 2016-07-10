/// <reference path="../common/webextensions.d.ts"/>
/// <reference path="../common/common.d.ts"/>

let placeholder = () => {};

var sendMessage = (messageType: MessageType) => () => {

    console.log('sendMessage:', messageType);

    let message: Message = {
          type:     messageType
        , protocol: window.location.protocol
        , hostname: window.location.hostname
        , port:     window.location.port
        , pathname: window.location.pathname
    };

    chrome.runtime.sendMessage(message);
};

window.addEventListener('focus', () => {
    console.log('content::focus');
});

window.addEventListener('blur', () => {
    console.log('content::blur');
});

console.log('content::load');
