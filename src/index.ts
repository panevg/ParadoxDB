import pkg from "../package.json";

// import { Signale } from "signale";
import cac from "cac";

import { RegisterCommand } from "./cli";
import New from "./cli/new";

// const log: Signale = new Signale();

const cli = cac();

cli.name = pkg.build.filename;
cli.version(pkg.version);

RegisterCommand(cli, New); // Creating new database;

cli.help();
cli.parse();
