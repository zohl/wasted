/// <reference path="../common/webextensions.d.ts"/>
/// <reference path="../common/element.d.ts"/>
/// <reference path="../common/common.d.ts"/>
/// <reference path="./component.d.ts"/>


import * as log from '../common/log';
import * as reports from './reports/_init';
import * as settings from './settings/_init';
import {mkMenu} from './menu';

let components:Array<Component> = [
    reports
  , settings
  ];

let init = (root: HTMLDivElement) => {

    root.innerHTML = `
       <div class = "menu"></div>
       <hr/>
       <div class = "contents"></div>
    `;

    mkMenu(
          <HTMLDivElement>root.querySelector('.menu')
        , <HTMLDivElement>root.querySelector('.contents')
        , (component: Component) => { component.update(); }
        , components);

    let domAnchor = <HTMLAnchorElement>root.querySelector('.menu a');
    if (domAnchor != null) {
        domAnchor.click();
    }
};


window.onload = () => {
    var domApp = <HTMLDivElement>(document.querySelector('.app'));
    init(domApp);
}

