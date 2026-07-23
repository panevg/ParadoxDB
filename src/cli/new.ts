import type CLI from "../cli";
import Logger from "../Logger";
import Manifest from "../Manifest";

function New(opt: any) {
  if (opt.name === undefined) {
    Logger.error("option `--name <name>` is missing");
    return;
  }
  if (opt.vault === undefined) {
    Logger.error("option `--vault <path>` is missing");
    return;
  }

  let mf = new Manifest();
  mf.read();

  if (mf.vaults.find((v) => v.name === opt.name || v.vault === opt.vault)) {
    Logger.error("Database with this name or vault already exists.");
  } else {
    mf.vaults.push({
      name: opt.name,
      vault: opt.vault,
    });

    Logger.success("Created new database.");

    mf.write();
  }
}

export default {
  command: {
    command: "new",
    description: "Create a new database.",
  },
  options: [
    {
      option: "--name <name>",
      description: "Database name.",
    },
    {
      option: "--vault <path>",
      description: "Database location.",
    },
  ],
  action: New,
} as CLI;
