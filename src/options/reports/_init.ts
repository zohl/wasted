import * as log from '../../common/log';


let type = 'page';
let name = 'reports';

let domRoot: HTMLDivElement = null;

let init = (root: HTMLDivElement) => {
    domRoot = root;

    domRoot.innerHTML = `
      <h2>Reports</h2>
      <a href = "#generate">generate</a>
      <a href = "#clear">clear</a>
      <div class = "output"></div>
    `;

    let domClear = <HTMLAnchorElement>domRoot.querySelector('a[href="#clear"]');
    domClear.onclick = () => {
        log.clear();
        return false;
    };

    let domGenerate = <HTMLAnchorElement>domRoot.querySelector('a[href="#generate"]');
    let domOutput = <HTMLDivElement>domRoot.querySelector('.output');

    domGenerate.onclick = () => {
        log.query().then(data => {
            let tableData = data.map((datum: LogEntry, i:number) => {
                let timestamp:number = datum.timestamp;
                let group = datum.group;

                return `
                  <tr>
                    <td>${i.toString()}</td>
                    <td>${timestamp.toString()}</td>
                    <td>${((
                      (i + 1 < data.length)
                        ? data[i+1].timestamp
                        : Date.now())
                      - timestamp).toString()}</td>
                    <td>${group}</td>
                  </tr>
                `;
            }).join('');

            domOutput.innerHTML = `
              <table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>timestamp</th>
                    <th>duration</th>
                    <th>page</th>
                  </tr>
                </thead>
                ${tableData}
              </table>
            `;
        });
        return false;
    };
};


let update = () => {

};

export {type, name, init, update};
