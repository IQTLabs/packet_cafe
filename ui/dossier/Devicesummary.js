import * as React from "react";
import { Header } from "semantic-ui-react";
import Devicetable from "./Devicetable";

// import Devicetable2 from "./Devicetable2";
// import Devicetable3 from "./Devicetable3";

const Devicesummary = () => (
  <div
    style={{
      marginTop: "2em"
    }}
  >
    <Header as="h2">Device Summary</Header>
    <Devicetable></Devicetable>
  </div>
);

export default Devicesummary;
