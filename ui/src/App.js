import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import { Grid, Button } from 'semantic-ui-react';

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
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      sessionId: cookies.get('sessionID') || SESSION_ID
    };
  }

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

  handleCookies = (termsAccepted) => {
    const { cookies } = this.props;
    cookies.set('sessionID', SESSION_ID, { 
      path: '/',
      maxAge:'3600' 
    });
    cookies.set('termsAccepted', termsAccepted, { 
      path: '/',
      maxAge:'3600'
    });
  }

  render() { 
    return (
      <>
        <Navbar/>
        <Grid textAlign='center' container style={{ height: '100vh' }}>
          <Grid.Row columns={1}>
            <Grid.Column style={{ maxWidth: 240 }}>
              <Upload onSelectCookies={this.handleCookies} sessionId={this.state.sessionId}/>
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
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
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

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
