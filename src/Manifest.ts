import { join, dirname, resolve } from "path";
import { existsSync, readFileSync, writeFileSync, mkdirSync, chownSync } from "fs";

import type { Paths } from "env-paths";
import toml from "smol-toml";
import { parse } from "valibot";

import env from "./env";
import Logger from "./Logger";

import { ManifestSchema } from "./schemas/Manifest.schema";
import type { ManifestType, VaultType } from "./schemas/Manifest.schema";

export default class Manifest {
  private path: string;

  public vaults: VaultType[] = [];

  constructor(mode: "dev" | "prod" = env.mode, envs: Paths = env.paths) {
    if (mode === "dev") {
      this.path = join(resolve("./"), "config", "manifest.toml");
    } else {
      this.path = join(envs.config, "manifest.toml");
    }

    if (!existsSync(this.path)) {
      mkdirSync(dirname(this.path), { recursive: true });
      writeFileSync(this.path, toml.stringify({ db: [] }), "utf-8");
    }
  }

  public read(): void {
    let file: string = readFileSync(this.path, "utf-8");

    let manifest: ManifestType;

    try {
      manifest = parse(ManifestSchema, toml.parse(file));
    } catch (err: any) {
      Logger.error("Problems while trying to parse the manifest.\n\t\t> Manifest: " + this.path);
      return;
    }

    this.vaults = manifest.db ?? [];
  }

  public write(): void {
    let file: string = toml.stringify({
      db: this.vaults.filter(v => v.name.trim() !== "" && v.vault.trim() !== ""),
    } as ManifestType);

    writeFileSync(this.path, file, "utf-8");
  }

  public remove(name: string) {
    this.vaults = this.vaults.filter((v) => v.name !== name);

    this.write();
  }
}
