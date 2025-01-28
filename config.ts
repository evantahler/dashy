import { parse } from "yaml";
import fs from "fs/promises";
import { DashyConfig } from "./dashy";

const configFile = "./dashy.yaml";

export async function getConfig() {
  const content = await fs.readFile(configFile);
  const yaml: DashyConfig = parse(content.toString());

  console.log({ yaml });

  if (yaml.dashy_version !== 1) {
    throw new Error("Invalid version");
  }

  return yaml;
}
