import React from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { useParams } from "react-router";

import { Statistic, Label, Table, Segment } from "semantic-ui-react";
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

function sortReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column || state.index === action.index) {
        return {
          ...state,
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        index: action.idx,
        direction: 'ascending',
      }
    default:
      throw new Error()
  }
}

export const Devicetable = (props) => {
  const [state, dispatch] = React.useReducer(sortReducer, {
    column: null,
    index: null,
    direction: null,
  })
  const { column, index, direction } = state
  const { typeFilter } = useParams();
  const data = useSelector(state => deviceTableModelForFile(state, props.fileId))
              .filter((d) => typeFilter==="all" || d.networkMlLabels[0].label.replace(/\s/g, "").toLowerCase() === typeFilter)
              .sort((a, b) => {
                if(!column){
                  return 0;
                }
                const dir = direction  === 'ascending' ? 1 : -1;

                if(column === "networkMlLabels" && index >= 0){
                  return dir * a["networkMlLabels"][index].label.localeCompare(b["networkMlLabels"][index].label);
                }
                else
                  return dir * a[column].localeCompare(b[column]);
                  
              });
  
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
                sorted={column === 'IP' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'IP', idx: null })}
              >
                IP
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'MAC' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'MAC', idx: null })}
              >
                MAC
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'OS' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'OS', idx: null })}
              >
                OS
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={ index === 0 ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'networkMlLabels', idx: 0 })}
              >
                Primary Label
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={ index === 1 ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'networkMlLabels', idx: 1 })}
              >
                Secondary Label
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={ index === 2 ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'networkMlLabels', idx: 2 })}
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
                <Table.Row key={device} sortable>
                  <Table.Cell>{IP}</Table.Cell>
                  <Table.Cell>{MAC}</Table.Cell>
                  <Table.Cell>{OS || "No OS reported by p0f"}</Table.Cell>
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
                        this device is a{vowels.includes(networkMlLabels[0].label.charAt(0).toLowerCase()) && "n"}
                        <br /> {networkMlLabels[0].label}
                    </Label>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="fa-layers fa-fw fa-4x">
                      <FontAwesomeIcon icon={iconMap[networkMlLabels[1].label.toLowerCase()]} color={"#ddd"} />
                      <FontAwesomeIcon
                        icon={iconMap[networkMlLabels[1].label.toLowerCase()]}
                        color={"#BEBEBE"}
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
                      this device is a{vowels.includes(networkMlLabels[0].label.charAt(0).toLowerCase()) && "n"}
                      <br /> {networkMlLabels[1].label}
                    </Label>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="fa-layers fa-fw fa-4x">
                      <FontAwesomeIcon icon={iconMap[networkMlLabels[2].label.toLowerCase()]} color={"#ddd"} />
                      <FontAwesomeIcon
                        icon={iconMap[networkMlLabels[2].label.toLowerCase()]}
                        color={"#BEBEBE"}
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
                      this device is a{vowels.includes(networkMlLabels[0].label.charAt(0).toLowerCase()) && "n"}
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
