import * as v from "valibot";

export const VaultSchema = v.object({
  name: v.string(),
  vault: v.string(),
});

export type VaultType = v.InferOutput<typeof VaultSchema>;

export const ManifestSchema = v.object({
  db: v.exactOptional(v.array(VaultSchema)),
});

export type ManifestType = v.InferOutput<typeof ManifestSchema>;
