import { parse } from "yaml";
import fs from "fs/promises";

const configFile = "./dashy.yaml";

export type DashyVariants =
  | "Primary"
  | "Secondary"
  | "Success"
  | "Danger"
  | "Warning"
  | "Info"
  | "Light"
  | "Dark";

export type DashyTextWidgetProps = {
  type: "text";
  text: string;
};

export type DashyQuestionWidgetProps = {
  type: "question";
  question: string;
};

export type DashyWidget = {
  title: string;
  variant: DashyVariants;
  properties: DashyTextWidgetProps | DashyQuestionWidgetProps;
  display: {
    height: number;
    width: number;
  };
};

export type DashyConfig = {
  dashy_version: number;
  title: string;
  slug: string;
  widgets: DashyWidget[];
};

export async function getConfig() {
  const content = await fs.readFile(configFile);
  const yaml: DashyConfig = parse(content.toString());

  console.log({ yaml });

  if (yaml.dashy_version !== 1) {
    throw new Error("Invalid version");
  }

  return yaml;
}
