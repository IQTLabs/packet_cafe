import React from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { Header, Table } from "semantic-ui-react";
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
  "Admin. Workstation": faUserLock,
  "Business Workstation": faDesktop,
  "Developer Workstation": faTerminal,
  "AD Controller": faUsersCog,
  "Admin. Server": faServer,
  "Confluence Server": faMountain,
  "Exchange Server": faEnvelopeOpenText,
  "File Share": faFolderOpen,
  "Git Server": faCodeBranch,
  "GPU Laptop": faLaptopCode,
  "Printer": faPrint,
  "PKI Server": faKey,
  "Unknown Device": faQuestionCircle
};

const tableData = [
  {
    device: "Inventec",
    OS: "Linux",
    IP: "10.0.2.15",
    MAC: "40:61:86:9a:f1:f5",
    networkMLlabel1: { label: "Admin. Server", confidence: 0.75 },
    networkMLlabel2: { label: "Confluence Server", confidence: 0.2 },
    networkMLlabel3: { label: "PKI Server", confidence: 0.05 }
  },
  {
    device: "Super Micro",
    OS: "Windows 7",
    IP: "67.215.65.132",
    MAC: "08:00:27:cc:3f:1b",
    networkMLlabel1: { label: "Admin. Server", confidence: 0.75 },
    networkMLlabel2: { label: "PKI Server", confidence: 0.2 },
    networkMLlabel3: { label: "Printer", confidence: 0.05 }
  },
  {
    device: "Super Micro 2",
    OS: "Windows 7",
    IP: "172.16.255.1",
    MAC: "00:1e:68:51:4f:a9",
    networkMLlabel1: { label: "Admin. Server", confidence: 0.6 },
    networkMLlabel2: { label: "Exchange Server", confidence: 0.2 },
    networkMLlabel3: { label: "Confluence Server", confidence: 0.2 }
  },
  {
    device: "Cisco",
    OS: "NX-OS",
    IP: "172.16.255.2",
    MAC: "00:d9:d1:10:21:f9",
    networkMLlabel1: { label: "Admin. Server", confidence: 0.6 },
    networkMLlabel2: { label: "AD Controller", confidence: 0.2 },
    networkMLlabel3: { label: "Git Server", confidence: 0.2 }
  }
];

const deviceModelForFile = createSelector(
  state => state.data.deviceModel,
  (_, fileId) => fileId,
  (deviceModel, fileId) => deviceModel[fileId] || {}
)

export const Devicetable = (props) => {

  const data = useSelector(state => deviceModelForFile(state, props.fileId))

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
            networkMLlabel1,
            networkMLlabel2,
            networkMLlabel3
          }) => (
            <Table.Row key={device}>
              <Table.Cell>
                <Header>{device}</Header>
              </Table.Cell>
              <Table.Cell>{OS}</Table.Cell>
              <Table.Cell>{IP}</Table.Cell>
              <Table.Cell>{MAC}</Table.Cell>
              <Table.Cell>{networkMLlabel1}</Table.Cell>
              <Table.Cell>{networkMLlabel2}</Table.Cell>
              <Table.Cell>{networkMLlabel3}</Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
}

export default Devicetable;
