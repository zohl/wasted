/// <reference path="../../common/common.d.ts"/>

interface Report {
    name: string;
    init: (root: HTMLDivElement) => void;
    update: (data: Array<LogEntry>) => void;
}
