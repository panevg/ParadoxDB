import pkg from "../package.json";

import envPaths, { type Paths } from "env-paths";

export default {
  paths: envPaths(pkg.build.filename, {
    suffix: "",
  }),
  mode:
    process.execPath.endsWith("bun") || process.execPath.endsWith("bun.exe")
      ? "dev"
      : "prod",
} as {
  paths: Paths;
  mode: "dev" | "prod";
};
