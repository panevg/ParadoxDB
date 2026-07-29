import { resolve } from "path";

import type CLI from "../cli";
import Manifest from "../Manifest";

function List(opt: any) {
    const manifest = new Manifest();
    manifest.read();

    if (opt.name !== undefined) {
        const v = manifest.vaults.find(va => va.name === opt.name.toString());

        if (v !== undefined) {
            console.log(`> ${v.name} ${resolve(v.vault)}`);
        } else {
            console.log(`Database named ${opt.name} does not exist`);
        }
    } else {
        manifest.vaults.forEach(v => console.log(`> ${v.name} ${resolve(v.vault)}`));
    }
}

export default {
    command: {
        command: "list",
        description: "Shows a list of databases."
    },
    options: [
        {
            option: "-n, --name [name]",
            description: "The name of the specific database to display information."
        }
    ],
    action: List
} as CLI;