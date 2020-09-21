import * as React from "react";
import { Grid, Header } from "semantic-ui-react";
import Devicecount from "./Devicecount";
import Endpointdevicecards from "./Endpointdevicecards";
import NetworkMLcontext from "./NetworkMLcontext";

const Endpointsummary = () => (
  <div
    style={{
      marginTop: "2em"
    }}
  >
    <Header as="h2">Endpoint Summary</Header>
    <Grid>
      <Grid.Row centered columns={2}>
        <Grid.Column width={2} style={{ paddingLeft: "3em" }}>
          <Devicecount></Devicecount>
        </Grid.Column>
        <Grid.Column width={14}>
          <Endpointdevicecards></Endpointdevicecards>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2} style={{ marginTop: "-1.5em" }}>
        <Grid.Column width={2} style={{ paddingLeft: "3em" }}></Grid.Column>
        <Grid.Column width={14}>
          <NetworkMLcontext></NetworkMLcontext>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Endpointsummary;
