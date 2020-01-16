import React from 'react';
import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';

import { fetchResults } from 'epics/fetch-results-epic'

import './App.css';
import Upload from 'components/upload/Upload';
import Navbar from 'components/Navbar';
import Table from 'components/table/Table.js';
import TermsOfService from 'components/about-legal-terms/TermsOfService';

const uuidv4 = require('uuid/v4');
const SESSION_ID = uuidv4();

class App extends React.Component {
  state = { modalOpen:false, termsAccepted: false }

  handleTerms = () => {
    this.setState(prevState => ({
      modalOpen:!prevState.modalOpen
    }))
  }

  fetchResults = () => {
      console.log("Peasant Burnination initiated...");
      this.props.fetchResults({ 'sessionId': SESSION_ID });
      console.log("Peasant Burnination complete!");
  }

  render() {
    return (
      <>
        <Navbar/>
        <Grid textAlign='center' style={{ height: '100vh' }} divided='vertically'>
          <Grid.Row columns={1}>
              <Grid.Column onClick={this.handleTerms} style={{ maxWidth: 240 }}>
                <div style={!this.state.termsAccepted ? {pointerEvents: "none", opacity: "0.4"} : {}}>
                  <Upload sessionId={SESSION_ID}/>
                </div>
              </Grid.Column>
              <TermsOfService open={this.state.modalOpen} modalClose={this.handleTerms}/>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <div>
                <button onClick={this.fetchResults}>
                  Burninate Peasants
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

const mapStateToProps = null;

const mapDispatchToProps = {
    fetchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
