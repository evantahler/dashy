import { getConfig } from "@/config";
import { DashyConfig, DashyWidget, AllDashyWidgetProps } from "@/dashy";
import BarChartWidget from "@/widgets/bar_chart";
import QuestionWidget from "@/widgets/question";
import TextWidget from "@/widgets/text";
import UnknownWidget from "@/widgets/unknown";
import { CardGroup } from "react-bootstrap";

export default function IndexPage({ config }: { config: DashyConfig }) {
  console.log(config);
  return (
    <>
      <h1>{config.title}</h1>
      <CardGroup>
        {config.widgets.map((widget, index) => renderWidget(widget, index))}
      </CardGroup>
    </>
  );
}

function renderWidget(widget: DashyWidget<any>, index: number) {
  const key = `widget_${index}`;
  switch (widget.properties.type) {
    case "text":
      return <TextWidget key={key} widget={widget} />;
    case "question":
      return <QuestionWidget key={key} widget={widget} />;
    case "bar_chart":
      return <BarChartWidget key={key} widget={widget} />;
    default:
      return <UnknownWidget key={key} widget={widget} />;
  }
}

export async function getServerSideProps() {
  const config = await getConfig();

  return { props: { config } };
}
