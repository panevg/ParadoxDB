import pkg from "../package.json";

import { Signale } from "signale";
import cac from "cac";
import envPaths from "env-paths";

const log: Signale = new Signale();

const cli = cac();

const paths = envPaths(pkg.build.filename, {
  suffix: "",
});

cli.name = pkg.build.filename;
cli.version(pkg.version);

const mode: "dev" | "prod" =
  process.execPath.endsWith("bun") || process.execPath.endsWith("bun.exe")
    ? "dev"
    : "prod";

cli
  .command("new-db", "Create a new database.")
  .option("-n, --name <name>", "Database name.")
  .option("-v, --vault <path>", "Database location.")
  // .option("--", ".")
  .action((options) => {
    console.log(options);
  });

cli.help();
cli.parse();
