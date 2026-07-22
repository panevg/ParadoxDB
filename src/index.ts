import pkg from "../package.json";

// import { Signale } from "signale";
import cac from "cac";

import { RegisterCommand } from "./cli";
import New from "./cli/new";
import List from "./cli/list";

// const log: Signale = new Signale();

const cli = cac();

cli.name = pkg.build.filename;
cli.version(pkg.version);

RegisterCommand(cli, New); // Creating new database;
RegisterCommand(cli, List); // Shows information about databases;

cli.help();
cli.parse();
