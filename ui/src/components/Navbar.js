import React from 'react';
import { Menu } from "semantic-ui-react";
import { Link } from 'react-router-dom';

class Navbar extends React.Component{
    render(){
        return(
            <Menu>
                <Menu.Item name="home">
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item name="devices">
                  <Link to="/devices">Devices</Link>
                </Menu.Item>
            </Menu>
        )
    }
}
export default Navbar;
