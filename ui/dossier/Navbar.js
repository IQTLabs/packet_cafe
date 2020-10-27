import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
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
  faMountain
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => (
  <div>
    <Menu borderless stackable size="massive" fixed="top">
      <Container>
        <Menu.Item as="a" header>
          <Image
            size="mini"
            src="https://res.cloudinary.com/dzu5qhcon/image/upload/v1600102039/logo/PacketCafeLogo.svg"
            style={{ marginRight: "1.5em" }}
          />
          Packet Caf&#233;
        </Menu.Item>
        <Menu.Item as="a">PCAP Dossier</Menu.Item>
        <Dropdown item simple text="Devices">
          <Dropdown.Menu>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faQuestionCircle} /> Unknown Devices
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Workstations</Dropdown.Header>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faUserLock} /> Administrative Workstations
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faDesktop} /> Business Workstations
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faTerminal} /> Developer Workstations
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Specialized Devices</Dropdown.Header>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faUsersCog} /> Active Directory Controllers
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faServer} /> Administrative Servers
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faMountain} /> Confluence Servers
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faEnvelopeOpenText} /> Exchange Servers
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faFolderOpen} /> File Shares
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faCodeBranch} /> Git Servers
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faLaptopCode} /> GPU Laptops
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faKey} /> PKI Servers
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faPrint} /> Printers
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item simple text="Traffic">
          <Dropdown.Menu>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faExclamationTriangle} /> Unknown
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faLockOpen} /> Plaintext
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faLock} /> Encrypted
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item simple text="Ports">
          <Dropdown.Menu>
            <Dropdown.Header>1-1023</Dropdown.Header>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faThLarge} /> Privileged
            </Dropdown.Item>{" "}
            <Dropdown.Divider />
            <Dropdown.Header>1024-49151</Dropdown.Header>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faThList} /> Registered
            </Dropdown.Item>{" "}
            <Dropdown.Divider />
            <Dropdown.Header>49152-65535</Dropdown.Header>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faTh} /> Private
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item disabled as="a">
          Compare PCAPs
        </Menu.Item>
        <Menu.Item as="a">About</Menu.Item>
        <Menu.Item as="a" header></Menu.Item>
      </Container>
    </Menu>
  </div>
);

export default Navbar;
