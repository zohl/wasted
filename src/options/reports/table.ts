/// <reference path="../../common/common.d.ts"/>

let domRoot: HTMLDivElement = null;

let name = 'table';

let init = (root: HTMLDivElement) => {
    domRoot = root;
};

let update = (data: Array<LogEntry>): void => {

    let tableData = data.map((entry: LogEntry, i:number) => {
        return `
            <tr>
            <td>${i.toString()}</td>
            <td>${entry.timestamp.toString()}</td>
            <td>${entry.duration.toString()}</td>
            <td>${entry.group.name}</td>
            </tr>
        `;
    }).join('');

    domRoot.innerHTML = `
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
};

export {name, init, update};
