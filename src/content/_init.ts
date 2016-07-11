/// <reference path="../common/webextensions.d.ts"/>
/// <reference path="../common/common.d.ts"/>

var sendMessage = (messageType: MessageType) => {

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
    sendMessage('start');
});

window.addEventListener('blur', () => {
    sendMessage('stop');
});

if(document.hasFocus()) {
    sendMessage('start');
}
