/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Col,
  CardBody,
  Form,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import TelemetryHeader from "components/Headers/TelemetryHeader";
import axios from 'axios';


const Telemetry = () => {

  let { id } = useParams();

  const [udpateDataArr, setUpdateDataArr] = useState([]);

  const indexes = {
    "pul": "Pulse",
    "bat": "Battery",
    "sn": "Serial Number",
    "uid": "Serial Number",
    "wt": "Weight"
  }

  const getTelemetry = async (id) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: {"deviceId": id},
    }
    
    await axios.post(`http://localhost:3030/telemetry`,config)
    .then(res => {
      let dataArr = res.data.items.slice(0, 10);
      console.log(dataArr)
      setUpdateDataArr(dataArr)
    }).catch(err => {
      console.log("--- catech error", err);
    })
  }

  const SetValue = (val, key) => {
    if (key == "wt") {
      let wtVal = (Number(val)/453.592).toFixed(3) + " (lb)"
      return wtVal;
    } else if (key == "ts") {
      console.log("-- date ", new Date(val), val);
      return (new Date(val)).toLocaleString({ timeZone: 'UTC-4' })
    } else if (key == "bat") {
      return val + " %"
    } else {
      return val;
    }
  }

  useEffect(() => {
    getTelemetry(id);
  }, [])

  return (
    <>
      <TelemetryHeader  data = {udpateDataArr.length?udpateDataArr[0]['deviceData']:{}} />
      {/* Page content */}
      <Container className="mt--9" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">Telemetry Record</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <div className="col">
                        <Card className="shadow">
                          <CardHeader className="border-0">
                          </CardHeader>
                          { udpateDataArr.length > 0 && 
                            <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Serial Number</th>
                                <th scope="col">Data Type</th>
                                <th scope="col">{udpateDataArr[0]['deviceData']['wt']?"Weight":"Pulse"}</th>
                                <th scope="col">Battery</th>
                                <th scope="col">Signal</th>
                                {udpateDataArr[0]['deviceData']['pul'] && <th>Irregular Heartbeat Indicator</th>}
                                {udpateDataArr[0]['deviceData']['pul'] && <th>Three measure flag</th>}
                                {udpateDataArr[0]['deviceData']['pul'] && <th>Systolic</th>}
                                {udpateDataArr[0]['deviceData']['pul'] && <th>Diastolic</th>}
                                {udpateDataArr[0]['deviceData']['pul'] && <th>Hand Tremor</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {udpateDataArr.map((item, index) => {
                                return (
                                <tr key={index}>
                                  <th scope="row">
                                    {item['deviceData'].sn?item['deviceData'].sn:item['deviceData'].uid}
                                  </th>
                                  <td>
                                    {item['deviceData']['data_type']}
                                  </td>
                                  <td>{item['deviceData']['wt']?SetValue(item['deviceData']['wt'], "wt"):SetValue(item['deviceData']['pul'], "pul")}</td>
                                  <td>
                                    {SetValue(item['deviceData']['bat'], "bat")}
                                  </td>
                                  <td>
                                    {item['deviceData']['sig']}
                                  </td>
                                  {item['deviceData']['pul'] && <td>{JSON.stringify(item['deviceData']['ihb'])}</td>}
                                  {item['deviceData']['pul'] && <td>{JSON.stringify(item['deviceData']['tri'])}</td>}
                                  {item['deviceData']['pul'] && <td>{item['deviceData']['sys']}</td>}
                                  {item['deviceData']['pul'] && <td>{item['deviceData']['dia']}</td>}
                                  {item['deviceData']['pul'] && <td>{JSON.stringify(item['deviceData']['hand'])}</td>}
                                </tr>
                                )
                              })}
                              
                            </tbody>
                          </Table>
                          }
                          
                        </Card>
                      </div>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Telemetry;
