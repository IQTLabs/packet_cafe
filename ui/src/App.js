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
import { setSessionId, getResults, getToolStatuses, getToolResults } from 'domain/data';

import './App.css';
import Upload from 'components/upload/Upload';
import Navbar from 'components/Navbar';
import DataMonitor from 'components/data/DataMonitor';
import Table from 'components/table/Table.js';

const SESSION_ID = uuidv4();

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    const sessionId = cookies.get('sessionID') || SESSION_ID
    this.props.setSessionId(sessionId);
    this.state = {
      sessionId: sessionId
    };
  }

  componentWillUnmount() {
    this.props.stopFetchResults();
  }

  fetchResults = () => {
      console.log("Peasant Burnination initiated...");
      this.props.fetchResults({ 'sessionId': this.state.sessionId });
      this.props.fetchTools();
      console.log("Peasant Burnination complete!");
  }

  fetchStatuses = () => {
      console.log("Norm Abrams is doing all of the real work....")
      for(const row of this.props.rows){
        this.props.fetchToolStatus({ 'sessionId': this.state.sessionId, 'fileId':row.id });
      }
      console.log("statuses: %o", this.props.statuses)
      console.log("This House Oldification complete")
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
                <Button circular basic color='green'  onClick={this.fetchResults}>
                  Burninate Peasants (Fetch Results)
                </Button>
                <Button circular basic color='teal' onClick={this.fetchStatuses}>
                  Bob Villa was useless. (Fetch Statuses)
                </Button>
                <Button circular basic color='orange' onClick={() => { localStorage.clear() }}>
                  Clear Results
                </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Table sessionId={this.state.sessionId}/>
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
  const toolResults = getToolResults(state)
  console.log("toolResults: %o", toolResults);
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
