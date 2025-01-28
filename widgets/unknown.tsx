import { DashyWidget } from "@/dashy";
import { Card } from "react-bootstrap";

export default function UnknownWidget({ widget }: { widget: DashyWidget }) {
  return (
    <Card bg="warning">
      <Card.Body>
        <Card.Title>Unknown</Card.Title>
        <Card.Text>
          I don't know what a "{widget.properties.type}" widget is
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
