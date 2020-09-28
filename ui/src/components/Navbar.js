import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

class Navbar extends React.Component{
    render(){
        return(
            <Menu size="large">
                <Menu.Item header><img src="favicon.ico" alt="Packet Cafe"></img>&nbsp;Packet Café</Menu.Item>
                <Menu.Menu position="left">
                    <Dropdown item simple text='About'>
                        <Dropdown.Menu>
                            <Dropdown.Item><a href="https://iqtlabs.gitbook.io/packet-cafe/">Documentation</a></Dropdown.Item>
                            <Dropdown.Item><a href="https://github.com/IQTLabs/packet_cafe/">Source Code</a></Dropdown.Item>
                            <Dropdown.Item><a href="https://www.cyberreboot.org/">Cyber Reboot</a></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        )
    }
}
export default Navbar;
