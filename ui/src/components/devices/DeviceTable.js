import React from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { useParams } from "react-router";

import { Statistic, Label, Header, Table, Segment } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
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

import './DeviceTable.css';

library.add(
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
);


const iconMap = {
  "administrator workstation": "fas fa-user-lock fa-4x",
  "business workstation": "fas fa-desktop fa-4x",
  "developer workstation": "fas fa-terminal fa-4x",
  "active directory controller": "fas fa-users-cog fa-4x",
  "administrator server": "fas fa-server fa-4x",
  "confluence server": "fas fa-mounatin fa-4x",
  "exchange server": "fas fa-envelope-open-text fa-4x",
  "distributed file share": "fas fa-folder-open fa-4x",
  "git server": "fas fa-code-branch fa-4x",
  "gpu laptop": "fas fa-laptop-code fa-4x",
  "printer": "fas fa-print fa-4x",
  "pki server": "fas fa-key fa-4x",
  "unknown device": "fas fa-question-circle fa-4x"
};

const deviceTableModelForFile = createSelector(
  state => state.data.deviceTableModel,
  (_, fileId) => fileId,
  (deviceTableModel, fileId,) => deviceTableModel[fileId]|| []
)

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch();


export const Devicetable = (props) => {
  const { typeFilter } = useParams();
  const data = useSelector(state => deviceTableModelForFile(state, props.fileId))
              .filter((d) => typeFilter==="all" || d.networkMlLabels[0].label.replace(/\s/g, "").toLowerCase() == typeFilter);
  return (
    <div
      style={{
        marginTop: "3em"
      }}
    >
      <Segment
        piled
        style={{
          marginTop: "5em"
        }}
      >
        <i data-fa-symbol="favorite" class="fas fa-star"></i>
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
              }) => {
                const clp_pcts = [
                                  ((1-networkMlLabels[0].confidence) * 100).toFixed(2).toString() + "%",
                                  ((1-networkMlLabels[1].confidence) * 100).toFixed(2).toString() + "%",
                                  ((1-networkMlLabels[2].confidence) * 100).toFixed(2).toString() + "%"
                                ]
                const classNames = [
                                  iconMap[networkMlLabels[0].label.toLowerCase()],
                                  iconMap[networkMlLabels[1].label.toLowerCase()],
                                  iconMap[networkMlLabels[2].label.toLowerCase()],
                                ]
                return(
                <Table.Row key={device}>
                  <Table.Cell>
                    <Header>{device}</Header>
                  </Table.Cell>
                  <Table.Cell>{OS}</Table.Cell>
                  <Table.Cell>{IP}</Table.Cell>
                  <Table.Cell>{MAC}</Table.Cell>
                  <Table.Cell className="primary-type">
                    <span className="fa-layers fa-fw icon-set">
                      <i
                        className={classNames[0]}
                        style={{ color: "#ddd" }}
                      ></i>
                      <i
                        className={classNames[0]}
                        style={{ color: "#00b5ad", clipPath: "inset(" + clp_pcts[0] + " 0 0 0)" }}
                      ></i>
                    </span>
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
                    <span className="fa-layers fa-fw icon-set">
                      <i
                        className={classNames[1]}
                        style={{ color: "#ddd" }}
                      ></i>
                      <i
                        className={classNames[1]}
                        style={{ color: "black",clipPath: "inset(" + clp_pcts[1] + " 0 0 0)" }}
                      ></i>
                    </span>
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
                  <Table.Cell>
                    <span className="fa-layers fa-fw icon-set">
                      <i
                        className={classNames[2]}
                        style={{ color: "#ddd" }}
                      ></i>
                      <i
                        className={classNames[2]}
                        style={{ color: "black", clipPath: "inset(" + clp_pcts[2] + " 0 0 0)" }}
                      ></i>
                    </span>
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
              )}
            )}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
}

export default Devicetable;
