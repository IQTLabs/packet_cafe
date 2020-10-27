import * as React from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { Grid, Header, Table } from "semantic-ui-react";

const pcapStatsModelForFile = createSelector(
  state => state.data.statsModel,
  (_, fileId) => fileId,
  (statsModel, fileId) => statsModel[fileId] || {}
)

const PcapSummary = (props) => {
    const data = useSelector(state => pcapStatsModelForFile(state, props.fileId))["fileSummary"]
    return(
      <div>
        <Header as="h1">{data["filename"]}</Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Table definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Filename</Table.Cell>
                    <Table.Cell>{data["fileName"]}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Capture duration</Table.Cell>
                    <Table.Cell>{data["duration"]}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Total packets</Table.Cell>
                    <Table.Cell>{data["totalPackets"]}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>File size</Table.Cell>
                    <Table.Cell>{data["fileSize"]}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Data size</Table.Cell>
                    <Table.Cell>{data["dataSize"]}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Average packet size</Table.Cell>
                    <Table.Cell>{data["avgSize"]}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
  )
};

export default PcapSummary;