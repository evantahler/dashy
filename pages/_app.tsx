import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/header";
import Footer from "../components/footer";
import "./../scss/theme.scss";

export default function Layout({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>

      <Header />

      <Container>
        <Row>
          <Col md={12}>
            <br />
            <Component {...pageProps} />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
