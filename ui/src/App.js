import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { setSessionId, getFileId, setFileId } from 'domain/data';

import './App.css';
import Navbar from 'components/Navbar';
import Home from 'components/home/Home';
import Dossier from 'components/dossier/Dossier';
import DeviceTable from 'components/devices/DeviceTable';

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
        'maxAge': 86400,
        'sameSite': 'strict',
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
            <Navbar selectedFileId={this.props.fileId} setFileId={this.props.setFileId}/>
            <Switch>
              <Route exact path="/">
                <Home sessionId={this.state.sessionId} clearResults={this.clearResults} fileId={this.props.fileId} setFileId={this.setFileId}/>
              </Route>
              <Route exact path="/dossier">
                <Dossier sessionId={this.state.sessionId} fileId={this.props.fileId}/>
              </Route>
              <Route path="/devices/:typeFilter">
                <DeviceTable sessionId={this.state.sessionId} fileId={this.props.fileId}/>
              </Route>
              <Route component={Error}/>
            </Switch>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("fileId: %o", getFileId(state));
  return {
    "fileId": getFileId(state),
  }
}

const mapDispatchToProps = {
    setSessionId,
    setFileId,
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));