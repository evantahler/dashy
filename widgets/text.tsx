import { DashyTextWidgetProps, DashyWidget } from "@/dashy";
import { Card } from "react-bootstrap";

export default function TextWidget({
  widget,
}: {
  widget: DashyWidget<DashyTextWidgetProps>;
}) {
  return (
    <Card bg={widget.variant?.toLowerCase()}>
      <Card.Body>
        <Card.Title>{widget.title}</Card.Title>
        <Card.Text>{widget.properties.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
