import React from 'react';
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

const deviceMap =[
    {"group": null,
     "items":[
        {"name": "Unknown Devices", "icon": faQuestionCircle, "route":"/"}, 
     ]
    },
    {"group": "Workstations",
     "items":[
        {"name": "Administrative Workstations", "icon": faUserLock, "route":"/"},
        {"name": "Business Workstations", "icon": faDesktop, "route":"/"},
        {"name": "Developer Workstations", "icon": faTerminal, "route":"/"},
     ]
    },
    {"group": "Specialized Devices",
     "items":[
        {"name": "Active Directory Controllers", "icon": faUsersCog, "route":"/"}, 
        {"name": "Administrative Servers", "icon": faServer, "route":"/"}, 
        {"name": "Confluence Servers", "icon": faMountain, "route":"/"}, 
        {"name": "Exchange Servers", "icon": faEnvelopeOpenText, "route":"/"}, 
        {"name": "File Shares", "icon": faFolderOpen, "route":"/"}, 
        {"name": "Git Servers", "icon": faCodeBranch, "route":"/"}, 
        {"name": "GPU Laptops", "icon": faLaptopCode, "route":"/"}, 
        {"name": "PKI Servers", "icon": faKey, "route":"/"}, 
        {"name": "Printers", "icon": faPrint, "route":"/"}
     ]
    },
     
]

const trafficMap =[
    {"name": "Unknown", "icon": faExclamationTriangle, "route":"/"}, 
    {"name": "Plaintext", "icon": faLockOpen, "route":"/"},
    {"name": "Encrypted", "icon": faLock, "route":"/"},
]

const portMap = [
    {"group": "1-1023",
     "items":[
        {"name": "Privileged", "icon": faThLarge, "route":"/"}, 
     ]
    },
    {"group": "1024-49151",
     "items":[
        {"name": "Registered", "icon": faThList, "route":"/"}, 
     ]
    },
    {"group": "49152-65535",
     "items":[
        {"name": "Private", "icon": faTh, "route":"/"}, 
     ]
    },
]

const Navbar = () => {

    return (
  <div>
    <Menu borderless stackable size="massive" fixed="top">
      <Container>
        <Menu.Item header>
            <Link to="/">
                <Image
                size="mini"
                src="https://res.cloudinary.com/dzu5qhcon/image/upload/v1600102039/logo/PacketCafeLogo.svg"
                style={{ marginRight: "1.5em" }}
                />
                Packet Caf&#233;
            </Link>
        </Menu.Item>
        <Menu.Item >PCAP Dossier</Menu.Item>
        <Dropdown item simple text="Devices">
            <Dropdown.Menu>
            {    
                deviceMap.map((dm)=>{
                    return (
                            <>
                                {dm.group && <Dropdown.Header key={dm.group + "-header"}>{dm.group}</Dropdown.Header>}
                                {
                                    dm.items.map((i) =>{
                                        return (
                                            <Dropdown.Item key={dm.group + "-" + i.name}>
                                                <Link to={i.route}>
                                                    <FontAwesomeIcon icon={i.icon} /> {i.name}
                                                </Link>
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </>
                    )
                 })
     
            }
            </Dropdown.Menu>
        </Dropdown>
        <Dropdown item simple text="Traffic">
          <Dropdown.Menu>
            {
                trafficMap.map((tm)=>{
                    return (
                        <Dropdown.Item key={tm.name}>
                            <Link to={tm.route}>
                                <FontAwesomeIcon icon={tm.icon} /> {tm.name}
                            </Link>
                        </Dropdown.Item>
                    )
                })
            }
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item simple text="Ports">
          <Dropdown.Menu>
            {
                portMap.map((pm)=>{
                    return (
                        <>
                        <Dropdown.Header key={pm.group + "-header"}>{pm.group}</Dropdown.Header>
                        {
                            pm.items.map((i) =>{
                                return(
                                    <Dropdown.Item key={pm.group + "-" + i.name}>
                                        <Link to={i.route}>
                                            <FontAwesomeIcon icon={i.icon} /> {i.name}
                                        </Link>
                                    </Dropdown.Item>
                                )
                            })
                        }
                        </>
                    )
                })
            }
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item disabled as="a">
          Compare PCAPs
        </Menu.Item>
        <Menu.Item as="a">About</Menu.Item>
        <Menu.Item as="a" header></Menu.Item>
      </Container>
    </Menu>
  </div>)
}

export default Navbar;