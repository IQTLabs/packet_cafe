import React from "react";
import { Table } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./iconfills.css";

import {
  faServer,
  faEnvelopeOpenText,
  faLaptopCode,
  faFolderOpen,
  faKey,
  faDesktop,
  faUserLock,
  faMountain,
  faPrint,
  faTerminal,
  faUsersCog,
  faQuestionCircle,
  faCodeBranch
} from "@fortawesome/free-solid-svg-icons";

const Devicetable = () => (
  <Table sortable celled striped>
    <Table.Header>
      Device Icons with variable fill rates
      <Table.Row>
        <Table.HeaderCell>Device Category</Table.HeaderCell>
        <Table.HeaderCell>Glyph Name</Table.HeaderCell>
        <Table.HeaderCell>Unicode Value</Table.HeaderCell>
        <Table.HeaderCell>1%</Table.HeaderCell>
        <Table.HeaderCell>5%</Table.HeaderCell>
        <Table.HeaderCell>20%</Table.HeaderCell>
        <Table.HeaderCell>66%</Table.HeaderCell>
        <Table.HeaderCell>87%</Table.HeaderCell>
        <Table.HeaderCell>100%</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>faQuestionCircle </Table.Cell>
        <Table.Cell>f059</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Administrative Workstations</Table.Cell>
        <Table.Cell>faUserLock</Table.Cell>
        <Table.Cell>f502</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faUserLock} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faUserLock} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faUserLock} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faUserLock} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faUserLock} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faUserLock} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Business Workstations</Table.Cell>
        <Table.Cell>faDesktop</Table.Cell>
        <Table.Cell>f108</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faDesktop} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faDesktop} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faDesktop} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faDesktop} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faDesktop} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faDesktop} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Developer Workstations</Table.Cell>
        <Table.Cell>faTerminal</Table.Cell>
        <Table.Cell>f120</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faTerminal} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faTerminal} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faTerminal} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faTerminal} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faTerminal} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faTerminal} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Active Directory Controllers</Table.Cell>
        <Table.Cell>faUsersCog</Table.Cell>
        <Table.Cell>f509</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faUsersCog} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faUsersCog} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faUsersCog} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faUsersCog} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faUsersCog} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faUsersCog} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Administrative Servers</Table.Cell>
        <Table.Cell>faServer</Table.Cell>
        <Table.Cell>f233</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faServer} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faServer} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faServer} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faServer} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faServer} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faServer} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Confluence Servers</Table.Cell>
        <Table.Cell>faMountain</Table.Cell>
        <Table.Cell>f233</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faMountain} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faMountain} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faMountain} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faMountain} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faMountain} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faMountain} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Exchange Servers</Table.Cell>
        <Table.Cell>faEnvelopeOpenText</Table.Cell>
        <Table.Cell>f658</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>File Shares</Table.Cell>
        <Table.Cell>faFolderOpen</Table.Cell>
        <Table.Cell>f07c</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faFolderOpen} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faFolderOpen} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faFolderOpen} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faFolderOpen} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faFolderOpen} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faFolderOpen} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Git Servers</Table.Cell>
        <Table.Cell>faCodeBranch</Table.Cell>
        <Table.Cell>f126</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>GPU Laptops</Table.Cell>
        <Table.Cell>faLaptopCode</Table.Cell>
        <Table.Cell>f5fc</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faLaptopCode} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faLaptopCode} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faLaptopCode} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faLaptopCode} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faLaptopCode} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faLaptopCode} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>PKI Servers</Table.Cell>
        <Table.Cell>faKey</Table.Cell>
        <Table.Cell>f084</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faKey} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faKey} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faKey} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faKey} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faKey} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faKey} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Printers</Table.Cell>
        <Table.Cell>faPrint</Table.Cell>
        <Table.Cell>f02f</Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "1%" }}>
              <FontAwesomeIcon icon={faPrint} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "5%" }}>
              <FontAwesomeIcon icon={faPrint} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "20%" }}>
              <FontAwesomeIcon icon={faPrint} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "66%" }}>
              <FontAwesomeIcon icon={faPrint} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "87%" }}>
              <FontAwesomeIcon icon={faPrint} />
            </i>
          </i>
        </Table.Cell>
        <Table.Cell>
          <i className="icon icon-base">
            <i className="icon icon-overlay" style={{ height: "100%" }}>
              <FontAwesomeIcon icon={faPrint} />
            </i>
          </i>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default Devicetable;
