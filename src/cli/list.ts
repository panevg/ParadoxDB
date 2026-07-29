import { resolve } from "path";

import type CLI from "../cli";
import Manifest from "../Manifest";
import Logger from "../Logger";

function List(opt: any) {
    const manifest = new Manifest();
    manifest.read();

    if (manifest.vaults.length === 0) {
        Logger.info("Manifest is empty.");
        return;
    }

    if (opt.name !== "++") {
        const v = manifest.vaults.find(va => va.name === opt.name.toString());

        if (v !== undefined) {
            Logger.log(`> ${v.name} ${resolve(v.vault)}`);
        } else {
            Logger.error(`Database named ${opt.name} does not exist`);
        }
    } else {
        manifest.vaults.forEach(v => Logger.log(`> ${v.name} ${resolve(v.vault)}`));
    }
}

export default {
    command: {
        command: "list",
        description: "Shows a list of databases."
    },
    options: [
        {
            option: "--name <name>",
            description: "The name of the specific database to display information.",
            default: "++"
        }
    ],
    action: List
} as CLI;