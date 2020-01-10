import React from 'react';
import { Menu } from 'semantic-ui-react';
import TermsOfService from './about-legal-terms/TermsOfService';

class Navbar extends React.Component{
    render(){
        return(
            <Menu size='large'>
                <Menu.Item header><h1>Packet Cafe</h1></Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>About Packet Cafe</Menu.Item>
                    <Menu.Item><TermsOfService /></Menu.Item>
                    <Menu.Item>Data Requirements</Menu.Item>
                    <Menu.Item>IQT Labs</Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}
export default Navbar;
