import { add } from './commands/add';
import { init } from './commands/init';
import { CommandChain } from './types/types';

export const commandFunctionMap: CommandChain = {
    init: init,
    add: add
}