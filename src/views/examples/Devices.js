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
import {
  Badge,
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
// import Header from "components/Headers/Header.js";
import { Link } from "react-router-dom";
import axios from 'axios';
import HeaderDevice from "components/Headers/HeaderDevice";

const Devices = () => {

  const [items, setItems] = useState([]);

  const getLastActivate = (timestap) => {
    var d = new Date(timestap);
    return d.toLocaleString();
  }

  const getDevices = async () => {
    const headers = {
      'Content-Type': 'application/json',
    }
    
    await axios.get(`http://localhost:3030/devices`,{headers:headers})
    .then(res => {
      setItems(res.data.items)
    }).catch(err => {
      console.log("--- catech error", err);
    })
  }
  useEffect(() => {
    getDevices()
  }, [])

  return (
    <>
      <HeaderDevice />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Devices</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Device ID</th>
                    <th scope="col">IMEI</th>
                    <th scope="col">Model Number</th>
                    <th scope="col">Status</th>
                    <th scope="col">Last Active</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    return (
                    <tr key={index}>
                      <th scope="row">
                        {item.deviceId}
                      </th>
                      <td>{item.imei}</td>
                      <td>
                        {item.modelNumber}
                      </td>
                      <td>
                        {item.status == "complete" ? 
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            Activated
                          </Badge>
                          :
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            Deactivated
                          </Badge>
                        }
                        
                      </td>
                      
                      <td>
                        {getLastActivate(item.lastActive)}
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Link to={"/admin/device/"+item.deviceId}>View Telemetry</Link>
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              ...
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              ...
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    )
                  })}
                  
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {/* <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem> */}
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Devices;
