import pkg from "../package.json";

import { Signale } from "signale";
import cac from "cac";
import envPaths from "env-paths";
import Manifest from "./Manifest";

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
  .option("--name <name>", "Database name.")
  .option("--vault <path>", "Database location.")
  .action((options) => {
    try {
      let mf = new Manifest(mode, paths);
      mf.read();

      if (
        mf.vaults.find(
          (v) => v.name === options.name || v.vault === options.vault,
        )
      ) {
        log.error("Database with this name or vault already exists.");
      } else {
        mf.vaults.push({
          name: options.name,
          vault: options.vault,
        });

        log.success("Created new database.");

        mf.write();
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  });

cli.help();
cli.parse();
