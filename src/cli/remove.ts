import type CLI from "../cli";
import Logger from "../Logger";
import Manifest from "../Manifest";

function New(opt: any) {
  if (opt.name === undefined) {
    Logger.error("option `--name <name>` is missing");
    return;
  }

  let mf = new Manifest();

  if (!mf.vaults.find((v) => v.name === opt.name.toString())) {
    Logger.error("Database with this name doesn't exists.");
  } else {
    mf.vaults = mf.vaults.filter(v => v.name !== opt.name.toString());

    Logger.success("The database was removed from the manifest.");

    mf.write();
  }
}

export default {
  command: {
    command: "remove",
    description: "Remove a database from manifest.",
  },
  options: [
    {
      option: "--name <name>",
      description: "Database name.",
    }
  ],
  action: New,
} as CLI;
