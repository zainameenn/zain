// Settings for the Sanity command line tool (for example `npx sanity login` or `npx sanity cors add`).
import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({ api: { projectId, dataset } });
