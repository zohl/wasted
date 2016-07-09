/// <reference path="../common/webextensions.d.ts"/>
/// <reference path="../common/element.d.ts"/>
/// <reference path="../common/common.d.ts"/>
/// <reference path="./component.d.ts"/>


import * as log from '../common/log';
import * as reports from './reports/_init';
import * as settings from './settings/_init';

let components:Array<Component> = [
    reports
  , settings
  ];

let init = (root: HTMLDivElement) => {

    let appHTML = `
       <div class = "menu"></div>
       <hr/>
       <div class = "contents"></div>
    `;
    root.innerHTML = appHTML;

    let domMenu = root.querySelector('.menu');
    let domContents = root.querySelector('.contents');

    let mkAnchor = (name: string) => {
        return ['<a href = "#', name, '">', name, '</a>'].join('');
    };

    let mkContainer = (name: string) => {
        return ['<div class = "', name, '"></div>'].join('');
    };

    components.forEach(component => {
        let name = component.name;

        domMenu.insertAdjacentHTML('beforeend', mkAnchor(name));
        let domAnchor = <HTMLAnchorElement>(domMenu.querySelector('a[href="#' + name + '"]'));

        domContents.insertAdjacentHTML('beforeend', mkContainer(component.name));
        let domContainer = <HTMLDivElement>root.querySelector('.contents > .' + name);

        domAnchor.onclick = () => {
            let domPage = <HTMLDivElement>root.querySelector('.contents > .active');
            if (domPage != null) {
                domPage.classList.remove('active');
            }
            component.update();
            domContainer.classList.add('active');
            return false;
        };

        component.init(domContainer);
    });

    let domAnchor = <HTMLAnchorElement>domMenu.querySelector('.menu a');
    if (domAnchor != null) {
        domAnchor.click();
    }
};


window.onload = () => {
    var domApp = <HTMLDivElement>(document.querySelector('.app'));
    init(domApp);
}

