import type CLI from "../cli";
import Manifest from "../Manifest";

function New(opt: any) {
  try {
    let mf = new Manifest();
    mf.read();

    if (mf.vaults.find((v) => v.name === opt.name || v.vault === opt.vault)) {
      console.error("Database with this name or vault already exists.");
    } else {
      mf.vaults.push({
        name: opt.name,
        vault: opt.vault,
      });

      console.log("Created new database.");

      mf.write();
    }
  } catch (err) {
    console.log(JSON.stringify(err));
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
