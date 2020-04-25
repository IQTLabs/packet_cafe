import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Grid, Button } from 'semantic-ui-react';

import { startFetchResults, stopFetchResults } from "epics/auto-fetch-results-epic"
import { fetchResults } from 'epics/fetch-results-epic'
import { fetchToolStatus } from 'epics/fetch-status-epic'
import { fetchTools } from 'epics/fetch-tools-epic'
import { setSessionId, getResults, getToolStatuses } from 'domain/data';

import './App.css';
import Upload from 'components/upload/Upload';
import Navbar from 'components/Navbar';
import DataMonitor from 'components/data/DataMonitor';
import Table from 'components/table/Table.js';

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

  componentWillMount() {
    this.props.fetchTools();
  }

  componentWillUnmount() {
    this.props.stopFetchResults();
  }

  clearResults = () =>{
    const { cookies } = this.props;
    cookies.remove(COOKIE_NAME)
    localStorage.clear(); 
    window.location.reload(false);
  }

  render() {
    const refreshInterval = this.props.refreshInterval || 5;
    return (
      <>
        <Navbar/>
        <DataMonitor sessionId={this.state.sessionId} files={this.props.rows} statuses={this.props.statuses} refreshInterval={refreshInterval}/>
        <Grid textAlign='center' container style={{ height: '100vh' }}>
          <Grid.Row columns={1}>
            <Grid.Column style={{ maxWidth: 240 }}>
              <Upload sessionId={this.state.sessionId} refreshInterval={refreshInterval}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
                
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Table sessionId={this.state.sessionId} clearResults={this.clearResults}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const results = getResults(state)
  const toolStatuses = getToolStatuses(state)

  return{
    rows: results.rows || [],
    statuses: toolStatuses || {},
  }
};

const mapDispatchToProps = {
    setSessionId,
    fetchResults,
    fetchToolStatus,
    fetchTools,
    startFetchResults,
    stopFetchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
