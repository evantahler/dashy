import { DashyWidget } from "@/dashy";
import { Card } from "react-bootstrap";

export default function QuestionWidget({ widget }: { widget: DashyWidget }) {
  if (widget.properties.type !== "question")
    throw new Error("Invalid widget type");

  return (
    <Card bg={widget.variant?.toLowerCase()}>
      <Card.Body>
        <Card.Title>{widget.title}</Card.Title>
        <Card.Text>{widget.properties.question}</Card.Text>
      </Card.Body>
    </Card>
  );
}
