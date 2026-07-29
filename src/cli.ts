import type { CAC } from "cac";

export type Command = {
  command: string;
  description: string;
};

export type Option = {
  option: string;
  description: string;
  default?: string;
};

export default interface CLI {
  command: Command;
  options: Option[];

  action: (...args: any) => any;
}

export function RegisterCommand(cac: CAC, command: CLI): void {
  let c = cac.command(command.command.command, command.command.description);

  command.options.forEach((o) => c = c.option(o.option, o.description, {
    default: o.default
  }));

  c.action(command.action);
}
