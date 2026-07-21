import { join, dirname } from "path";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";

import type { Paths } from "env-paths";
import toml from "smol-toml";
import { parse } from "valibot";

import { ManifestSchema } from "./schemas/Manifest.schema";
import type { ManifestType, VaultType } from "./schemas/Manifest.schema";

export default class Manifest {
  private path: string;

  public vaults: VaultType[] = [];

  constructor(mode: "dev" | "prod", envs: Paths) {
    if (mode === "dev") {
      this.path = join("./config", "manifest.toml");
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

    let manifest: ManifestType = parse(ManifestSchema, toml.parse(file));

    this.vaults = manifest.db ?? [];
  }

  public write(): void {
    let file: string = toml.stringify({
      db: this.vaults,
    } as ManifestType);

    writeFileSync(this.path, file, "utf-8");
  }
}
