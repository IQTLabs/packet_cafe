import React from 'react';
import { connect } from "react-redux";
import { Header, Grid } from "semantic-ui-react";

import DeviceCount from "components/devices/DeviceCount";
import DeviceCards from "components/devices/DeviceCards";
import NetworkMLContext from "components/devices/NetworkMLContext";

import './DeviceSummary.css';

const DeviceSummary = (props) => {

  return(
    <div
      style={{
        marginTop: "2em"
      }}
    >
      <Header as="h2">Endpoint Summary</Header>
      <Grid>
        <Grid.Row centered columns={2}>
          <Grid.Column width={2} style={{ paddingLeft: "3em" }}>
            <DeviceCount fileId={props.fileId}></DeviceCount>
          </Grid.Column>
          <Grid.Column width={14}>
            <DeviceCards></DeviceCards>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} style={{ marginTop: "-1.5em" }}>
          <Grid.Column width={2} style={{ paddingLeft: "3em" }}></Grid.Column>
          <Grid.Column width={14}>
            <NetworkMLContext></NetworkMLContext>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default DeviceSummary
