import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { setSessionId } from 'domain/data';

import './App.css';
import Navbar from 'components/Navbar';
import Home from 'components/home/Home';
import DeviceSummary from 'components/devices/DeviceSummary';

const COOKIE_NAME = 'sessionID'

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    const cookieSessionId = cookies.get(COOKIE_NAME);
    const sessionId = cookieSessionId || uuidv4();
    if(!cookieSessionId){
      const options = {
        'path':'/',
        'maxAge': 86400
      };
      cookies.set(COOKIE_NAME, sessionId, options);
    }
    this.props.setSessionId(sessionId);
    this.state = {
      sessionId: sessionId
    };
  }

  clearResults = () =>{
    const { cookies } = this.props;
    cookies.remove(COOKIE_NAME)
    localStorage.clear(); 
    window.location.reload(false);
  }
  
  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <Navbar/>
            <Switch>
              <Route exact path="/">
                <Home sessionId={this.state.sessionId} clearResults={this.clearResults}/>
              </Route>
              <Route path="/devices">
                <DeviceSummary sessionId={this.state.sessionId} />
              </Route>
              <Route component={Error}/>
            </Switch>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = null

const mapDispatchToProps = {
    setSessionId,
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));