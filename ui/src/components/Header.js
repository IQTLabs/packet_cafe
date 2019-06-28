import React from 'react';
import { Container, Menu} from 'semantic-ui-react';


class Navbar extends React.Component{
    render(){
        return(
            <Menu
              /*fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}*/
              size='large'
            >
                <Menu.Item header><h1>Packet Cafe</h1></Menu.Item> 
                <Menu.Menu position="right">
                    <Menu.Item as='a'>About Packet Cafe</Menu.Item>
                    <Menu.Item as='b'>Terms of Service</Menu.Item>
                    <Menu.Item as='c'>Data Requirements</Menu.Item>
                    <Menu.Item as='d'>IQT Labs</Menu.Item>
                </Menu.Menu>
                
                {/*<Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>*/}
         
            </Menu>
        )
    }
}

export default Navbar;