import * as React from "react";
import { Segment } from "semantic-ui-react";
import PcapSummary from "components/pcap/PcapSummary";
//import Endpointsummary from "./Endpointsummary";
import DeviceSummary from "components/devices/DeviceSummary";
import TrafficBarChart from "components/pcap/TrafficBarChart";

const Dossier = (props) => (
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
      <PcapSummary sessionId={props.sessionId} fileId={props.fileId} ></PcapSummary>
      <DeviceSummary fileId={props.fileId} ></DeviceSummary>
      <TrafficBarChart sessionId={props.sessionId} fileId={props.fileId} ></TrafficBarChart>
    </Segment>
  </div>
);

export default Dossier;