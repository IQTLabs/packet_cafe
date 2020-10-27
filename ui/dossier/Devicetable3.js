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
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faQuestionCircle} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faQuestionCircle} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faQuestionCircle} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faQuestionCircle} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faQuestionCircle} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Administrative Workstations</Table.Cell>
        <Table.Cell>faUserLock</Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUserLock} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUserLock}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUserLock} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUserLock}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUserLock} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUserLock}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUserLock} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUserLock}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUserLock} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUserLock}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Business Workstations</Table.Cell>
        <Table.Cell>faDesktop</Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faDesktop} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faDesktop}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faDesktop} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faDesktop}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faDesktop} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faDesktop}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faDesktop} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faDesktop}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faDesktop} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faDesktop}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Business Workstations</Table.Cell>
        <Table.Cell>faTerminal</Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faTerminal} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faTerminal}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faTerminal} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faTerminal}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faTerminal} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faTerminal}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faTerminal} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faTerminal}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faTerminal} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faTerminal}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Active Directory Controllers</Table.Cell>
        <Table.Cell>faUsersCog</Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUsersCog} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUsersCog}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUsersCog} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUsersCog}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUsersCog} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUsersCog}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUsersCog} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUsersCog}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faUsersCog} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faUsersCog}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Administrative Servers</Table.Cell>
        <Table.Cell>faServer</Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faServer} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faServer}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faServer} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faServer}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faServer} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faServer}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faServer} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faServer}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faServer} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faServer}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Confluence Servers</Table.Cell>
        <Table.Cell>faMountain</Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faMountain} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faMountain}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faMountain} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faMountain}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faMountain} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faMountain}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faMountain} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faMountain}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faMountain} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faMountain}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Exchange Servers</Table.Cell>
        <Table.Cell>faEnvelopeOpenText </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faEnvelopeOpenText} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faEnvelopeOpenText} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faEnvelopeOpenText} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faEnvelopeOpenText} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faEnvelopeOpenText} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>File Shares</Table.Cell>
        <Table.Cell>faFolderOpen </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faFolderOpen} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faFolderOpen}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faFolderOpen} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faFolderOpen}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faFolderOpen} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faFolderOpen}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faFolderOpen} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faFolderOpen}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faFolderOpen} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faFolderOpen}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Git Servers </Table.Cell>
        <Table.Cell>faCodeBranch </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faCodeBranch} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faCodeBranch}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faCodeBranch} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faCodeBranch}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faCodeBranch} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faCodeBranch}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faCodeBranch} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faCodeBranch}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faCodeBranch} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faCodeBranch}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>GPU Laptops </Table.Cell>
        <Table.Cell>faLaptopCode </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faLaptopCode} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faLaptopCode}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faLaptopCode} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faLaptopCode}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faLaptopCode} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faLaptopCode}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faLaptopCode} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faLaptopCode}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faLaptopCode} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faLaptopCode}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>PKI Servers </Table.Cell>
        <Table.Cell>faKey </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faKey} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faKey}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faKey} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faKey}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faKey} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faKey}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faKey} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faKey}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faKey} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faKey}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell> Printers </Table.Cell>
        <Table.Cell>faPrint </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faPrint} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faPrint}
              color={"#00b5ad"}
              style={{ clipPath: "inset(95% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faPrint} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faPrint}
              color={"#00b5ad"}
              style={{ clipPath: "inset(80% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faPrint} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faPrint}
              color={"#00b5ad"}
              style={{ clipPath: "inset(33% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faPrint} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faPrint}
              color={"#00b5ad"}
              style={{ clipPath: "inset(13% 0 0 0)" }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="fa-layers fa-fw fa-4x">
            <FontAwesomeIcon icon={faPrint} color={"#ddd"} />
            <FontAwesomeIcon
              icon={faPrint}
              color={"#00b5ad"}
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default Devicetable;
