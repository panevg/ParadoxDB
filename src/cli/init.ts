import { rm } from "fs/promises";
import { existsSync, writeFileSync, mkdirSync, readdirSync, mkdir } from "fs";
import { join } from "path";

import env from "../env";

import type CLI from "../cli";
import Logger from "../Logger";

import Manifest from "../Manifest";

const clean = (dir: string) => rm(dir, { recursive: true, force: true });

async function Init(opt: any) {
    const mf = new Manifest();

    if (opt.name === undefined) {
        Logger.error("option `--name <name>` is missing");
        return;
    }

    const v = mf.vaults.find(va => va.name === opt.name.toString());

    if (v === undefined) {
        Logger.error("Database with this name doesn't exists.");
    } else {
        const src = v.vault;

        if (existsSync(src)) {
            if (readdirSync(src).length > 0) {
                if (opt.force) {
                    await clean(src);
                    mkdirSync(src, { recursive: true });
                } else {
                    Logger.error("The directory is not empty. \n\t\tIf you want to clean the directory, use the --force flag.");
                    return;
                }
            }
        } else mkdirSync(src, { recursive: true });

        if (!existsSync(join(src, "config.toml")) || opt.force) {
            writeFileSync(join(src, "config.toml"), `
[meta]\nname = ""\ndescription = ""\nversion = 0.0\n
[storage]\npage_max_entries = 500\nendianness = "little"\n
[size_types]\nstring = "UInt8"\nbinary = "UInt64"\n\narray_max_length = 642\n
[logs]\nlog_life_length = "1d"
        `.trim(), "utf-8");
        } else {
            Logger.error("The file config.toml already exists.\n\t\t If you want to overwrite it, use the --force flag.");
            return;
        }

        if (!existsSync(join(src, "logs")) || opt.force) {
            await clean(join(src, "logs"));
            mkdirSync(join(src, "logs"));
        }
        else {
            Logger.error("The directory ./logs already exists.\n\t\t If you want to overwrite it, use the --force flag.");
            return;
        }

        if (!existsSync(join(src, "pages")) || opt.force) {
            await clean(join(src, "pages"));
            mkdirSync(join(src, "pages"));
        }
        else {
            Logger.error("The directory ./pages already exists.\n\t\t If you want to overwrite it, use the --force flag.");
            return;
        }

        if (!existsSync(join(src, "tables")) || opt.force) {
            await clean(join(src, "tables"));
            mkdirSync(join(src, "tables"));
        }
        else {
            Logger.error("The directory ./tables already exists.\n\t\t If you want to overwrite it, use the --force flag.");
            return;
        }

        if (!existsSync(join(src, "types")) || opt.force) {
            await clean(join(src, "types"));
            mkdirSync(join(src, "types"));
        }
        else {
            Logger.error("The directory ./types already exists.\n\t\t If you want to overwrite it, use the --force flag.");
            return;
        }


        if (!existsSync(join(src, "variables")) || opt.force) {
            await clean(join(src, "variables"));
            mkdirSync(join(src, "variables"));
        }
        else {
            Logger.error("The directory ./variables already exists.\n\t\t If you want to overwrite it, use the --force flag.");
            return;
        }

        Logger.success("Initialization was successful!");
    }
}

export default {
    command: {
        command: "init",
        description: "Initializes the database."
    },
    options: [
        {
            option: "--name <name>",
            description: "The name of the database to initialize."
        },
        {
            option: "--force",
            description: "In case of conflicts during initialization, overwriting will take precedence."
        }
    ],
    action: Init
} as CLI;