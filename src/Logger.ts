import { Signale } from "signale";

let s = new Signale();

let e = s.error;

s.error = (message?: any, ...optionalArgs: any[]) => {
    e(message, ...optionalArgs);
    process.exit(1);
}

export default s;