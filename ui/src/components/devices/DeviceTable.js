import React from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { useParams } from "react-router";

import { Statistic, Label, Header, Table, Segment } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  (deviceTableModel, fileId,) => deviceTableModel[fileId]|| []
)

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
                const vowels = ["a", "e", "i", "o", "u"]
                return(
                <Table.Row key={device}>
                  <Table.Cell>
                    <Header>{device}</Header>
                  </Table.Cell>
                  <Table.Cell>{OS}</Table.Cell>
                  <Table.Cell>{IP}</Table.Cell>
                  <Table.Cell>{MAC}</Table.Cell>
                  <Table.Cell className="primary-type">
                    <span className="fa-layers fa-fw fa-4x">
                      <FontAwesomeIcon icon={iconMap[networkMlLabels[0].label.toLowerCase()]} color={"#ddd"} />
                      <FontAwesomeIcon
                        icon={iconMap[networkMlLabels[0].label.toLowerCase()]}
                        color={"#00b5ad"}
                        style={{ clipPath: "inset(" + clp_pcts[0] + " 0 0 0)" }}
                      />
                    </span>
                    <Label color="teal" pointing="left">
                        <Statistic size="mini" inverted>
                          <Statistic.Value>{(networkMlLabels[0].confidence * 100).toFixed(2)} %</Statistic.Value>
                        </Statistic>
                        <br />
                        confidence
                        <br />
                        this device is a
                        <br /> {networkMlLabels[0].label}
                    </Label>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="fa-layers fa-fw fa-4x">
                      <FontAwesomeIcon icon={iconMap[networkMlLabels[1].label.toLowerCase()]} color={"#ddd"} />
                      <FontAwesomeIcon
                        icon={iconMap[networkMlLabels[1].label.toLowerCase()]}
                        color={"black"}
                        style={{ clipPath: "inset(" + clp_pcts[1] + " 0 0 0)" }}
                      />
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
                    <span className="fa-layers fa-fw fa-4x">
                      <FontAwesomeIcon icon={iconMap[networkMlLabels[2].label.toLowerCase()]} color={"#ddd"} />
                      <FontAwesomeIcon
                        icon={iconMap[networkMlLabels[2].label.toLowerCase()]}
                        color={"black"}
                        style={{ clipPath: "inset(" + clp_pcts[2] + " 0 0 0)" }}
                      />
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
