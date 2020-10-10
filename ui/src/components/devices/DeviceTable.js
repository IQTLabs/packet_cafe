import React from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { Statistic, Label, Header, Table } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLock,
  faDesktop,
  faTerminal,
  faUsersCog,
  faServer,
  faMountain,
  faEnvelopeOpenText,
  faFolderOpen,
  faCodeBranch,
  faLaptopCode,
  faKey,
  faQuestionCircle,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "administrator workstation": faUserLock,
  "business workstation": faDesktop,
  "developer workstation": faTerminal,
  "active directory controller": faUsersCog,
  "administrator server": faServer,
  "confluence server": faMountain,
  "exchange server": faEnvelopeOpenText,
  "distributed file share": faFolderOpen,
  "git server": faCodeBranch,
  "gpu laptop": faLaptopCode,
  "printer": faPrint,
  "pki server": faKey,
  "unknown device": faQuestionCircle
};

const deviceTableModelForFile = createSelector(
  state => state.data.deviceTableModel,
  (_, fileId) => fileId,
  (deviceTableModel, fileId) => deviceTableModel[fileId] || {}
)

export const Devicetable = (props) => {

  const data = useSelector(state => deviceTableModelForFile(state, props.fileId))

  return (
    <Table sortable celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
          >
            Device
          </Table.HeaderCell>
          <Table.HeaderCell
          >
            OS
          </Table.HeaderCell>
          <Table.HeaderCell
          >
            IP
          </Table.HeaderCell>
          <Table.HeaderCell
          >
            MAC
          </Table.HeaderCell>
          <Table.HeaderCell
          >
            Primary Label
          </Table.HeaderCell>
          <Table.HeaderCell
          >
            Secondary Label
          </Table.HeaderCell>
          <Table.HeaderCell
          >
            Tertiary Label
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(
          ({
            OS,
            IP,
            device,
            MAC,
            networkMlLabels,
          }) => (
            <Table.Row key={device}>
              <Table.Cell>
                <Header>{device}</Header>
              </Table.Cell>
              <Table.Cell>{OS}</Table.Cell>
              <Table.Cell>{IP}</Table.Cell>
              <Table.Cell>{MAC}</Table.Cell>
              <Table.Cell>
                <FontAwesomeIcon icon={iconMap[networkMlLabels[0].label.toLowerCase()]} size="4x" color="#00b2ac" />
                <Label color="teal" pointing="left">
                    <Statistic size="mini" inverted>
                      <Statistic.Value>{(networkMlLabels[0].confidence * 100).toFixed(2)} %</Statistic.Value>
                    </Statistic>
                    <br />
                    confidence
                    <br />
                    this device is an
                    <br /> {networkMlLabels[0].label}
              </Label>
              </Table.Cell>
              <Table.Cell>
                <FontAwesomeIcon icon={iconMap[networkMlLabels[1].label.toLowerCase()]} size="4x" />
                <Label pointing="left">
                    <Statistic size="mini">
                      <Statistic.Value>{(networkMlLabels[1].confidence * 100).toFixed(2)} %</Statistic.Value>
                    </Statistic>
                    <br />
                    confidence
                    <br />
                    this device is an
                    <br /> {networkMlLabels[1].label}
              </Label>
              </Table.Cell>
              <Table.Cell><FontAwesomeIcon icon={iconMap[networkMlLabels[2].label.toLowerCase()]} size="4x" />
                <Label pointing="left">
                    <Statistic size="mini">
                      <Statistic.Value>{(networkMlLabels[2].confidence * 100).toFixed(2)} %</Statistic.Value>
                    </Statistic>
                    <br />
                    confidence
                    <br />
                    this device is an
                    <br /> {networkMlLabels[2].label}
              </Label>
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
}

export default Devicetable;
