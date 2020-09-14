import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component{
    render(){
        return(
            <div>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/devices">Devices</NavLink>
            </div>
        )
    }
}
export default Navbar;
