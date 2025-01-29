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

export type DashyBarChartWidgetProps = {
  type: "bar_chart";
  question: string;
};

export type DashyPieChartWidgetProps = {
  type: "bar_chart";
  question: string;
};

export type AllDashyWidgetProps =
  | DashyTextWidgetProps
  | DashyQuestionWidgetProps
  | DashyBarChartWidgetProps
  | DashyPieChartWidgetProps;

export type DashyWidget<T extends AllDashyWidgetProps> = {
  title: string;
  variant: DashyVariants;
  properties: T;
  display: {
    height: number;
    width: number;
  };
};

export type DashyConfig = {
  dashy_version: number;
  title: string;
  slug: string;
  widgets: DashyWidget<AllDashyWidgetProps>[];
};

export type AirbridgeDataPoint = {
  x: string;
  y: number;
};

export type AirbridgeResponse = {
  error: string | null;
  sql: string | null;
  response: string | null;
  data: Record<string, AirbridgeDataPoint[]> | null;
};

export async function airbridgeRequest(
  message: string,
  stream: boolean = false
): Promise<AirbridgeResponse> {
  const airbridge_url = process.env.NEXT_PUBLIC_AIRBRIDGE_URL;
  const airbridge_api_key = process.env.NEXT_PUBLIC_AIRBRIDGE_API_KEY;
  const assistant_id = process.env.NEXT_PUBLIC_ASSISTANT_ID;
  const url = `${airbridge_url}/api/v1/assistants/${assistant_id}/chat/completions`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${airbridge_api_key}`,
  };
  const body = { messages: [{ content: message, role: "user" }], stream };

  const req = fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  // if (stream) {
  //   return req;
  // }

  const response = await req;
  try {
    const payload: any = await response.json();
    const rawMessage = payload.choices[0].message.content;
    const trimmedMessage = rawMessage
      .replace(/```json/g, "")
      .replace(/```.*/g, "");
    const parsedMessage: AirbridgeResponse = JSON.parse(trimmedMessage);
    return parsedMessage;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to parse response" + e);
  }
}
