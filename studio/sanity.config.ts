import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityEnv } from "./sanity.env";
import { schemaTypes } from "./schemaTypes";

const { projectId, dataset } = sanityEnv;

if (!projectId) {
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID in the repository root .env.local before starting Sanity Studio.",
  );
}

export default defineConfig({
  name: "dare-network",
  title: "Dare Network",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
