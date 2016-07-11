/// <reference path="group.d.ts"/>

interface LogEntry {
  timestamp : number;
  duration  : number;
  group     : Group;
  ongoing   : boolean;
}


type MessageType = 'start' | 'stop'

interface Message {
  type:     MessageType;
  protocol: string;
  hostname: string;
  port:     string;
  pathname: string;
}

