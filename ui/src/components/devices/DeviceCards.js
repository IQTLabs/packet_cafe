import * as React from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
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
import { Button, Card, Grid, Label } from "semantic-ui-react";

const iconMap = {
  "administrator workstation": { "icon": faUserLock, "displayName": "Administrator Workstation" },
  "business workstation": { "icon": faDesktop, "displayName": "Business Workstation" },
  "developer workstation": { "icon": faTerminal, "displayName": "Developer Workstation" },
  "active directory controller": { "icon": faUsersCog, "displayName": "Active Directory Controller" },
  "administrator server": { "icon": faServer, "displayName": "Administrator Server" },
  "confluence server": { "icon": faMountain, "displayName": "Confluence Server" },
  "exchange server": { "icon": faEnvelopeOpenText, "displayName": "Exchange Server" },
  "distributed file share": { "icon": faFolderOpen, "displayName": "Distributed File Share" },
  "git server": { "icon": faCodeBranch, "displayName": "Git Server" },
  "gpu laptop": { "icon": faLaptopCode, "displayName": "GPU Laptop" },
  "printer": { "icon": faPrint, "displayName": "Printer" },
  "pki server": { "icon": faKey, "displayName": "PKI Server" },
  "unknown device": { "icon": faQuestionCircle, "displayName": "Unknown Device" },
};

const deviceGroupModelForFile = createSelector(
  state => state.data.deviceGroupModel,
  (_, fileId) => fileId,
  (deviceTableModel, fileId,) => deviceTableModel[fileId]|| {}
)

const DeviceCards = (props) => {
    const dgm = useSelector(state => deviceGroupModelForFile(state, props.fileId));
    const withDevices = Object.keys(dgm)
          .filter((key) => dgm[key]["count"] > 0)
          .map((k) => { return {"key": k, "confidence": dgm[k]["totalConfidence"], "count": dgm[k]["count"]} });
    return (
      <div
        style={{
          marginTop: "1em"
        }}
      >
        <br />
        <Grid>
          <Grid.Row
            style={{
              paddingLeft: "1em",
              paddingRight: "1em"
            }}
          >
            <Card.Group itemsPerRow={7}>
                {withDevices.map((wd) => {
                    return (
                      <Card>
                        <Label circular color="teal" size="massive" attached="top left">
                          {wd.count}
                        </Label>
                        <br />
                        <Card.Meta>
                          <FontAwesomeIcon
                            icon={iconMap[wd["key"]]["icon"]}
                            size="4x"
                            color="#505050"
                          />
                        </Card.Meta>
                        <Card.Description>
                          <strong>{ wd["count"] !=0 ? (wd["confidence"]/wd["count"] * 100).toFixed(2) : 0 }%</strong>
                        </Card.Description>
                        <Button attached="bottom">
                          {iconMap[wd["key"]]["displayName"]}
                        </Button>
                      </Card>
                    )
                })}
            </Card.Group>
          </Grid.Row>
        </Grid>
      </div>

    );
}

export default DeviceCards;
