import React from 'react';
import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';

import { fetchResults } from 'epics/fetch-results-epic'
import { fetchToolStatus } from 'epics/fetch-status-epic'
import { getResults, getToolStatuses } from 'domain/data';

import './App.css';
import Upload from 'components/upload/Upload';
import Navbar from 'components/Navbar';
import Table from 'components/table/Table.js';

const uuidv4 = require('uuid/v4');
const SESSION_ID = uuidv4();

class App extends React.Component {

  fetchResults = () => {
      console.log("Peasant Burnination initiated...");
      this.props.fetchResults({ 'sessionId': SESSION_ID });
      console.log("Peasant Burnination complete!");
  }

  fetchStatuses = () => {
      console.log("Norm Abrams is doing all of the real work....")
      for(const row of this.props.rows){
        this.props.fetchToolStatus({ 'sessionId': SESSION_ID, 'fileId':row.id });
      }
      console.log("statuses: %o", this.props.statuses)
      console.log("This House Oldification complete")
  }

  render() {
    return (
      <>
        <Navbar/>
        <Grid textAlign='center' style={{ height: '100vh' }} divided='vertically'>
          <Grid.Row columns={1}>
            <Grid.Column style={{ maxWidth: 240 }}>
              <Upload sessionId={SESSION_ID}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <div>
                <button onClick={this.fetchResults}>
                  Burninate Peasants
                </button>
                <button onClick={this.fetchStatuses}>
                  Bob Villa was useless.
                </button>
              </div>
              <Table sessionId={SESSION_ID}/>
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
    fetchResults,
    fetchToolStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
