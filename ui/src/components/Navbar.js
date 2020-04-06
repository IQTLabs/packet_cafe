import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

class Navbar extends React.Component{
    render(){
        return(
            <Menu size='large'>
                <Menu.Item header><h1>Packet Cafe</h1></Menu.Item>
                <Menu.Menu position="left">
                    <Dropdown item simple text='About'>
                        <Dropdown.Menu>
                            <Dropdown.Item>Data Requirements</Dropdown.Item>
                            <Dropdown.Item>IQT Labs</Dropdown.Item>
                            {/* <Dropdown.Divider />
                            <Dropdown.Header>Legal</Dropdown.Header>
                            <Dropdown.Item><TermsOfService /></Dropdown.Item> */}
                            {/* <Dropdown.Item>
                                <i className='dropdown icon' />
                                <span className='text'>Submenu</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        )
    }
}
export default Navbar;
