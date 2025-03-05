export type CommandChain = {
    [key: string]: (paths: Record<string, string>, args: Record<string, string | boolean | number>, supportedOptions: Record<string, Record<string, string>>) => void;
}

export type CommandFunction = (paths: Record<string, string>, args: Record<string, string | boolean | number>, supportedOptions: Record<string, Record<string, string>>) => void;

export type SupportedOptions = {
    [key: string]: {
        [key: string]: {
            name: string;
            type: string;
        }
    }
}