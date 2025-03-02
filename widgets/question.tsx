import { Spinner } from "@/components/spinner";
import {
  airbridgeRequest,
  AirbridgeResponse,
  DashyQuestionWidgetProps,
  DashyWidget,
} from "@/dashy";
import { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Card } from "react-bootstrap";
import { ArrowRepeat, InfoCircle } from "react-bootstrap-icons";

export default function QuestionWidget({
  widget,
}: {
  widget: DashyWidget<DashyQuestionWidgetProps>;
}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AirbridgeResponse | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(reload: boolean = false) {
    if (!reload && response) return;

    setResponse(null);
    setLoading(true);
    const _response = await airbridgeRequest(widget.properties.question);
    setResponse(_response);
    setLoading(false);
  }

  function showSql() {
    if (response?.sql) {
      alert(response.sql);
    }
  }

  return (
    <Card bg={widget.variant?.toLowerCase()}>
      <Card.Body>
        <Card.Title>{widget.title}</Card.Title>
        <Card.Text>
          <small>
            <em>{widget.properties.question}</em>
          </small>
        </Card.Text>
        {loading && <Spinner />}

        {response && (
          <Alert variant={response?.error ? "danger" : widget.variant}>
            <Alert.Heading>
              {response?.error || response?.response}
            </Alert.Heading>
          </Alert>
        )}

        <ButtonGroup>
          <Button size="sm" onClick={() => fetchData(true)} disabled={loading}>
            <ArrowRepeat />
          </Button>
          <Button size="sm" onClick={showSql} disabled={!response?.sql}>
            <InfoCircle />
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
