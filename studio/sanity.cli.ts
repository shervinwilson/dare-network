import { defineCliConfig } from "sanity/cli";
import { sanityEnv } from "./sanity.env";

const { projectId, dataset } = sanityEnv;

if (!projectId) {
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID in the repository root .env.local before running Sanity CLI commands.",
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  typegen: {
    enabled: true,
    path: ["../app/**/*.{ts,tsx}", "../sanity/**/*.{ts,tsx}"],
    schema: "schema.json",
    generates: "../sanity.types.ts",
    overloadClientMethods: true,
  },
});
