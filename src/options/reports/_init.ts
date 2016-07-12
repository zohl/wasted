/// <reference path="./report.d.ts"/>
/// <reference path="../../common/common.d.ts"/>

import * as log from '../../common/log';
import * as promise from '../../common/promise';
import * as table from './table';
import {mkMenu} from '../menu';


let type = 'page';
let name = 'reports';

let reports:Array<Report> = [
    table
  ];

let domRoot: HTMLDivElement = null;

let update = () => {
   log.query().then(newData => {

       let domAnchor = <HTMLAnchorElement>domRoot.querySelector('.menu .active');
       if (domAnchor != null) {
           domAnchor.click();
       }
   });
};


let init = (root: HTMLDivElement) => {
    domRoot = root;

    domRoot.innerHTML = `
      <h2>Reports</h2>
      <div class = "controls">
        <a href = "#clear">clear</a>
      </div>
      <div class = "menu"></div>
      <div class = "contents"></div>
    `;

    mkMenu(
          <HTMLDivElement>domRoot.querySelector('.menu')
        , <HTMLDivElement>domRoot.querySelector('.contents')
        , report => { log.query().then(report.update); } // TODO check volatility
        , reports);

    let domClear = <HTMLAnchorElement>domRoot.querySelector('a[href="#clear"]');
    domClear.onclick = () => {
        log.clear().then(update);
        return false;
    };

    update();
};

export {type, name, init, update};
