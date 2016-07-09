declare namespace WebExtensions {

    namespace Storage {
        interface GenericStorage {
            set: (value: any, callback: () => void) => void;
            get: (key: string | Array<string> | any, callback: (value: any) => void) => void;
        }
    }

    interface Storage {
        sync    : Storage.GenericStorage;
        local   : Storage.GenericStorage;
        managed : Storage.GenericStorage;
    }
}

