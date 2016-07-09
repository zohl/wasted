interface LogEntry {
  timestamp : number;
  duration  : number;
  group     : Group;
}


type MessageType = 'focus' | 'blur'

interface Message {
  type:     MessageType;
  protocol: string;
  hostname: string;
  port:     string;
  pathname: string;
}

type Group = string

