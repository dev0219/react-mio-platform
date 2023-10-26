// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const TelemetryHeader = (data) => {
  const  devinceInfo  = data.data;
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundColor:"transparent",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">{devinceInfo.sn?devinceInfo.sn:devinceInfo.uid}</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TelemetryHeader;
