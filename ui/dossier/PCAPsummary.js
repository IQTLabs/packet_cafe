import * as React from "react";
import { Grid, Header, Table } from "semantic-ui-react";

const PCAPsummary = () => (
  <div>
    <Header as="h1">smallFlows.pcap</Header>
    <p>Analyzed: 2020-09-14T14:48:00.000Z</p>
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Filename</Table.Cell>
                <Table.Cell>../smallFlows.pcap</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Capture duration</Table.Cell>
                <Table.Cell>298.5 seconds</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total packets</Table.Cell>
                <Table.Cell>14,261</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>File size</Table.Cell>
                <Table.Cell>9,444 kB</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Data size</Table.Cell>
                <Table.Cell>9,216 kB</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Average packet size</Table.Cell>
                <Table.Cell>646.28 bytes</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default PCAPsummary;
