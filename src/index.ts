import pkg from "../package.json";

import cac from "cac";

import Logger from "./Logger";

import { RegisterCommand } from "./cli";
import New from "./cli/new";
import List from "./cli/list";
import Remove from "./cli/remove";
import Init from "./cli/init";

const cli = cac();

cli.name = pkg.build.filename;
cli.version(pkg.version);

cli.command("", "").action(() => cli.outputHelp());

RegisterCommand(cli, New); // Creating new database;
RegisterCommand(cli, List); // Shows information about databases;
RegisterCommand(cli, Remove); // Remove a database from manifest;
RegisterCommand(cli, Init); // Initialize db;

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