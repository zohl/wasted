declare namespace WebExtensions {

    namespace Runtime {
        interface MessageSender {
            tab?          : any;    // TODO
            frameId?      : number; // TODO integer
            id?           : string;
            url?          : string;
            tlsChannelId? : string;
        }
    }

    interface Runtime {
        lastError: { message: string };

        onMessage: {
            addListener: (
                callback: (
                      message      : any
                    , sender       : Runtime.MessageSender
                    , sendResponse : (response: any) => void
                ) => void
            ) => boolean;
        };

        sendMessage: {
              ( extensionId       : string
              , message           : any
              , options?          : {includeTlsChannelId: boolean;}
              , responseCallback? : (response: any) => void
              ): void;

              ( message           : any
              , options?          : {includeTlsChannelId: boolean;}
              , responseCallback? : (response: any) => void
              ): void;
        }
    }
}

