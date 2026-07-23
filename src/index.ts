import pkg from "../package.json";

import cac from "cac";

import { RegisterCommand } from "./cli";
import New from "./cli/new";
import List from "./cli/list";
import Logger from "./Logger";

const cli = cac();

cli.name = pkg.build.filename;
cli.version(pkg.version);

RegisterCommand(cli, New); // Creating new database;
RegisterCommand(cli, List); // Shows information about databases;

cli.help();

try {
    cli.parse();
}
catch (err: any) {
    switch (err.name) {
        case "CACError":
            Logger.error(err.message);
    }
}