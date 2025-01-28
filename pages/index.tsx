import { getConfig, DashyConfig, DashyWidget } from "@/dashy";
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

function renderWidget(widget: DashyWidget, index: number) {
  const key = `widget_${index}`;
  switch (widget.properties.type) {
    case "text":
      return <TextWidget key={key} widget={widget} />;
    case "question":
      return <QuestionWidget key={key} widget={widget} />;
    default:
      return <UnknownWidget key={key} widget={widget} />;
  }
}

export async function getServerSideProps() {
  const config = await getConfig();

  return { props: { config } };
}
