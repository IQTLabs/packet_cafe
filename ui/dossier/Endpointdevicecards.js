import * as React from "react";
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

const Endpointdevicecards = () => (
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
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  size="4x"
                  color="#505050"
                />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              Unknown
              <br />
              Devices &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon icon={faUserLock} size="4x" color="#505050" />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              Admin.
              <br />
              Workstations &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon icon={faDesktop} size="4x" color="#505050" />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              Business
              <br />
              Workstations &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon icon={faTerminal} size="4x" color="#505050" />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              Developer
              <br />
              Workstations &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon icon={faUsersCog} size="4x" color="#505050" />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              Active Dir.
              <br /> Controllers&#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon icon={faServer} size="4x" color="#505050" />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              Admin.
              <br /> Servers&#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon icon={faMountain} size="4x" color="#505050" />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              Confluence
              <br />
              Servers &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon
                  icon={faEnvelopeOpenText}
                  size="4x"
                  color="#505050"
                />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              Exchange
              <br />
              Servers &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  size="4x"
                  color="#505050"
                />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              File
              <br />
              Shares &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon
                  icon={faCodeBranch}
                  size="4x"
                  color="#505050"
                />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              Git
              <br />
              Servers &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon
                  icon={faLaptopCode}
                  size="4x"
                  color="#505050"
                />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              GPU
              <br />
              Laptops &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon icon={faKey} size="4x" color="#505050" />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              PKI
              <br />
              Servers &#187;
            </Button>
          </Card>
          <Card>
            <Card.Content>
              <Label circular color="teal" size="massive" attached="top left">
                12
              </Label>
              <br />
              <Card.Meta>
                <FontAwesomeIcon icon={faPrint} size="4x" color="#505050" />
              </Card.Meta>
              <Card.Description>
                <strong>66% confidence</strong>
              </Card.Description>
            </Card.Content>
            <Button attached="bottom">
              <br />
              Printers &#187;
            </Button>
          </Card>
        </Card.Group>
      </Grid.Row>
    </Grid>
  </div>
);

export default Endpointdevicecards;
