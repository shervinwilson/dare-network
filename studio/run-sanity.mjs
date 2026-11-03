import nextEnv from "@next/env";
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const studioDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(studioDir, "..");
const sanityCli = resolve(projectRoot, "node_modules", "sanity", "bin", "sanity");
const { loadEnvConfig } = nextEnv;

loadEnvConfig(projectRoot);

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID in the repository root .env.local before running Sanity Studio commands.",
  );
}

const studioConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
};
writeFileSync(
  resolve(studioDir, "sanity.env.ts"),
  `export const sanityEnv = ${JSON.stringify(studioConfig)} as const;\n`,
);

const commandSets = {
  typegen: [
    ["schemas", "extract", "--force"],
    ["typegen", "generate"],
  ],
};
const commands = commandSets[process.argv[2]] ?? [process.argv.slice(2)];

for (const args of commands) {
  const result = spawnSync(process.execPath, [sanityCli, ...args], {
    cwd: studioDir,
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
