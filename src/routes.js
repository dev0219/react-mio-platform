
import Devices from "views/examples/Devices";
import Telemetry from "views/examples/Telemetry";

var routes = [
  {
    path: "/device/:id",
    name: "Telemetry",
    icon: "ni ni-single-02 text-yellow",
    component: <Telemetry />,
    layout: "/admin",
  },
  {
    path: "/devices",
    name: "Devices",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Devices />,
    layout: "/admin",
  },
];
export default routes;
