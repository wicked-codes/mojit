import {init} from './commands/init';
export const commandFunctionMap : Record<string, (paths:Record<string,string>, args:Record<string,string|boolean|number>, supportedOptions: Record<string, Record<string, string>>)=>void> = {
    init: init
}