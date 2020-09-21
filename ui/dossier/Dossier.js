import * as React from "react";
import { Segment } from "semantic-ui-react";
import PCAPsummary from "./PCAPsummary";
import Endpointsummary from "./Endpointsummary";
import Devicesummary from "./Devicesummary";
import Trafficsummary from "./Trafficsummary";

const Dossier = () => (
  <div
    style={{
      padding: "2em",
      backgroundColor: "#f5f5f5"
    }}
  >
    <Segment
      piled
      style={{
        marginTop: "5em"
      }}
    >
      <PCAPsummary></PCAPsummary>
      <Endpointsummary></Endpointsummary>
      <Devicesummary></Devicesummary>
      <Trafficsummary></Trafficsummary>
    </Segment>
  </div>
);

export default Dossier;
