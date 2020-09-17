import * as React from "react";
import { Grid, Header } from "semantic-ui-react";
import Trafficbarchart from "./Trafficbarchart";
import Trafficcontext from "./Trafficcontext";

const Trafficsummary = () => (
  <div
    style={{
      marginTop: "3em"
    }}
  >
    {" "}
    <Header as="h2">Traffic Summary</Header>
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column width={2} style={{ paddingLeft: "4em" }}></Grid.Column>
        <Grid.Column width={14}>
          <Trafficbarchart></Trafficbarchart>
          <Trafficcontext></Trafficcontext>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Trafficsummary;
