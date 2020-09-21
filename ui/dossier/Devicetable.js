import React from "react";
import { Statistic, Label, Table } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faServer,
  faEnvelopeOpenText,
  faLaptopCode,
  faFolderOpen,
  faKey,
  faCodeBranch,
  faUsersCog,
  faPrint,
  faDesktop,
  faUserLock,
  faTerminal,
  faQuestionCircle,
  faThLarge,
  faThList,
  faTh,
  faLockOpen,
  faLock,
  faExclamationTriangle,
  faMountain,
  faUserCog
} from "@fortawesome/free-solid-svg-icons";
import Devicetablepaging from "./Devicetablepaging";

const Devicetable = () => (
  <Table sortable celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Device</Table.HeaderCell>
        <Table.HeaderCell>OS</Table.HeaderCell>
        <Table.HeaderCell>IP</Table.HeaderCell>
        <Table.HeaderCell>MAC</Table.HeaderCell>
        <Table.HeaderCell>Primary Label</Table.HeaderCell>
        <Table.HeaderCell>Secondary Label</Table.HeaderCell>
        <Table.HeaderCell>Tertiary Label</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Inventec </Table.Cell>
        <Table.Cell>Linux</Table.Cell>
        <Table.Cell>10.0.2.15</Table.Cell>
        <Table.Cell>40:61:86:9a:f1:f5</Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faServer} size="4x" color="#00b2ac" />
          <Label color="teal" pointing="right">
            <Statistic size="mini" inverted>
              <Statistic.Value>60%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is an
            <br /> Admin. Server
          </Label>
        </Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faEnvelopeOpenText} size="4x" />
          <Label basic pointing="right">
            <Statistic size="mini">
              <Statistic.Value>20%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is a
            <br /> Exchange Server
          </Label>
        </Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faMountain} size="4x" />
          <Label basic pointing="right">
            <Statistic size="mini">
              <Statistic.Value>20%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is a
            <br /> Confluence Server
          </Label>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Super Micro</Table.Cell>
        <Table.Cell>Windows 7</Table.Cell>
        <Table.Cell>67.215.65.132</Table.Cell>
        <Table.Cell>08:00:27:cc:3f:1b</Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faServer} size="4x" color="#00b2ac" />
          <Label color="teal" pointing="right">
            <Statistic size="mini" inverted>
              <Statistic.Value>75%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is an
            <br /> Admin. Server
          </Label>
        </Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faMountain} size="4x" />
          <Label basic pointing="right">
            <Statistic size="mini">
              <Statistic.Value>20%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is a
            <br /> Confluence Server
          </Label>
        </Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faKey} size="4x" />
          <Label basic pointing="right">
            <Statistic size="mini">
              <Statistic.Value>5%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is a
            <br /> PKI Server
          </Label>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Super Micro 2</Table.Cell>
        <Table.Cell>Windows 7</Table.Cell>
        <Table.Cell>172.16.255.1</Table.Cell>
        <Table.Cell>00:1e:68:51:4f:a9</Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faServer} size="4x" color="#00b2ac" />
          <Label color="teal" pointing="right">
            <Statistic size="mini" inverted>
              <Statistic.Value>75%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is an
            <br /> Admin. Server
          </Label>
        </Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faKey} size="4x" />
          <Label basic pointing="right">
            <Statistic size="mini">
              <Statistic.Value>20%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is a
            <br /> PKI Server
          </Label>
        </Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faPrint} size="4x" />
          <Label basic pointing="right">
            <Statistic size="mini">
              <Statistic.Value>5%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is a
            <br /> Printer
          </Label>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cisco</Table.Cell>
        <Table.Cell>NX-OS</Table.Cell>
        <Table.Cell>172.16.255.2</Table.Cell>
        <Table.Cell>00:d9:d1:10:21:f9</Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faServer} size="4x" color="#00b2ac" />
          <Label color="teal" pointing="right">
            <Statistic size="mini" inverted>
              <Statistic.Value>60%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is an
            <br /> Admin. Server
          </Label>
        </Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faUserCog} size="4x" />
          <Label basic pointing="right">
            <Statistic size="mini">
              <Statistic.Value>20%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is an
            <br /> AD Controller
          </Label>
        </Table.Cell>
        <Table.Cell>
          <FontAwesomeIcon icon={faCodeBranch} size="4x" />
          <Label basic pointing="right">
            <Statistic size="mini">
              <Statistic.Value>20%</Statistic.Value>
            </Statistic>
            <br />
            confidence
            <br />
            this device is a
            <br /> Git Server
          </Label>
        </Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="7">
          <Devicetablepaging></Devicetablepaging>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);

export default Devicetable;
