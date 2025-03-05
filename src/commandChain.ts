import { init } from './commands/init';

type CommandChain = {
    [key: string]: (paths: Record<string, string>, args: Record<string, string | boolean | number>, supportedOptions: Record<string, Record<string, string>>) => void;
}

export const commandFunctionMap: CommandChain = {
    init: init
}