/// <reference path="webextensions.storage.d.ts"/>
/// <reference path="webextensions.runtime.d.ts"/>

declare namespace WebExtensions {
    interface Chrome {
        runtime: Runtime;
        storage: Storage;
    }
}

declare var chrome:WebExtensions.Chrome;
