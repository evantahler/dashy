import { Spinner } from "@/components/spinner";
import {
  AirbridgeDataPoint,
  airbridgeRequest,
  AirbridgeResponse,
  DashyBarChartWidgetProps,
  DashyWidget,
} from "@/dashy";
import { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Card, Tooltip } from "react-bootstrap";
import { ArrowRepeat, InfoCircle } from "react-bootstrap-icons";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js/auto";

ChartJS.register(...registerables);

export default function PieChartWidget({
  widget,
}: {
  widget: DashyWidget<DashyBarChartWidgetProps>;
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

        {response?.error && (
          <Card.Text>
            <Alert variant="danger">
              <Alert.Heading>{response?.error}</Alert.Heading>
            </Alert>
          </Card.Text>
        )}

        {response?.data && <BarChartDisplay data={response.data} />}

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

function BarChartDisplay({
  data,
}: {
  data: Record<string, AirbridgeDataPoint[]>;
}) {
  console.log(data);
  // assuming only one row returned
  const keys = Object.keys(data);
  const chartData = {
    labels: data[keys[0]].map((point) => point.x),
    datasets: [{ label: keys[0], data: data[keys[0]].map((point) => point.y) }],
  };

  return <Pie data={chartData} width={500} height={300} />;
}
