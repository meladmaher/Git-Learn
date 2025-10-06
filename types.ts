
export enum CommandType {
    GIT = 'git',
    CMD = 'cmd'
}

export interface Command {
  id: string;
  type: CommandType;
  category: string;
  title: string;
  short: string;
  detail: string;
  example: string;
}
