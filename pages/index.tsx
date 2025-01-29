import { getConfig } from "@/config";
import { DashyConfig, DashyWidget, AllDashyWidgetProps } from "@/dashy";
import BarChartWidget from "@/widgets/bar_chart";
import PieChartWidget from "@/widgets/pie_chart";
import QuestionWidget from "@/widgets/question";
import TextWidget from "@/widgets/text";
import UnknownWidget from "@/widgets/unknown";
import { CardGroup, Col, Row } from "react-bootstrap";

export default function IndexPage({ config }: { config: DashyConfig }) {
  console.log(config);
  return (
    <>
      <h1>{config.title}</h1>
      <Row>
        {config.widgets.map((widget, index) => renderWidget(widget, index))}
      </Row>
    </>
  );
}

function renderWidget(widget: DashyWidget<any>, index: number) {
  const key = `widget_${index}`;
  const style = { padding: "10px" };
  switch (widget.properties.type) {
    case "text":
      return (
        <Col style={style} md={widget.display.width}>
          <TextWidget key={key} widget={widget} />
        </Col>
      );
    case "question":
      return (
        <Col style={style} md={widget.display.width}>
          <QuestionWidget key={key} widget={widget} />
        </Col>
      );
    case "bar_chart":
      return (
        <Col style={style} md={widget.display.width}>
          {" "}
          <BarChartWidget key={key} widget={widget} />
        </Col>
      );
    case "pie_chart":
      return (
        <Col style={style} md={widget.display.width}>
          <PieChartWidget key={key} widget={widget} />
        </Col>
      );
    default:
      return (
        <Col style={style} md={widget.display.width}>
          <UnknownWidget key={key} widget={widget} />
        </Col>
      );
  }
}

export async function getServerSideProps() {
  const config = await getConfig();

  return { props: { config } };
}
