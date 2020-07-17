import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Grid } from 'semantic-ui-react';

import { startFetchResults, stopFetchResults } from "epics/auto-fetch-results-epic"
import { fetchResults } from 'epics/fetch-results-epic'
import { fetchToolStatus } from 'epics/fetch-status-epic'
<<<<<<< HEAD
import { setHeatmapData, getDataWranglingState } from 'domain/data_wrangling';
=======
import { fetchTools } from 'epics/fetch-tools-epic'
>>>>>>> cf11b1644903bcb359730349b002cc06679b4c7e
import { setSessionId, getResults, getToolStatuses } from 'domain/data';

import './App.css';
import Upload from 'components/upload/Upload';
import Navbar from 'components/Navbar';
import DataMonitor from 'components/data/DataMonitor';
import Table from 'components/table/Table.js';
import Heatmap from 'components/heatmap/Heatmap.js';

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
      ipResults: [],
      portResults:[],
      sessionId: sessionId
    };
  }

<<<<<<< HEAD
  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    const { ipResults, portResults } = props.vizData.heatmap;
    if (props.ipResults !== state.ipResults) {
      return {
        ipResults: ipResults,
        portResults: portResults
      };
    }
    return null;
  }

  fetchResults = () => {
      console.log("Peasant Burnination initiated...");
      this.props.fetchResults({ 'sessionId': this.state.sessionId });
      console.log("Peasant Burnination complete!");
      this.fetchHeatmapData();
=======
  componentWillMount() {
    this.props.fetchTools();
>>>>>>> cf11b1644903bcb359730349b002cc06679b4c7e
  }

  componentWillUnmount() {
    this.props.stopFetchResults();
  }

<<<<<<< HEAD
  fetchHeatmapData = async () => {
    const { setHeatmapData, rows, statuses } = this.props;
    const { sessionId } = this.state;

    const statusArray = Object.keys(statuses).map(key => ({
      tool: String(key), 
      id: rows[0].id,
      ...statuses[key]
    }));

    const mercury = statusArray.filter((data)=>{
        return data.tool === "mercury"
    })

    console.log(mercury);

    const url = `/raw/${sessionId}/${mercury[0].id}/${mercury[0].tool}`;
    console.log(url);

    if(mercury[0].status == "Complete"){
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          var ipData = {
            type:"ip",
            data:jsonData[0],
            // data:json,
            firstKey:"dst_ip",
            secondKey:"src_ip"
          }
    
          setHeatmapData(ipData);
    
          var portData = {
            type:"port",
            data:jsonData[0],
            // data: json,
            firstKey:"dst_port",
            secondKey:"src_port"
          }
    
          setHeatmapData(portData);
        });
     }

  }

  handleCookies = (termsAccepted) => {
=======
  clearResults = () =>{
>>>>>>> cf11b1644903bcb359730349b002cc06679b4c7e
    const { cookies } = this.props;
    cookies.remove(COOKIE_NAME)
    localStorage.clear(); 
    window.location.reload(false);
  }

<<<<<<< HEAD
  render() { 
    const { ipResults, portResults } = this.state;

=======
  render() {
    const refreshInterval = this.props.refreshInterval || 5;
>>>>>>> cf11b1644903bcb359730349b002cc06679b4c7e
    return (
      <>
        <Navbar/>
        <Grid textAlign='center' container style={{ height: '100vh' }}>
          <Grid.Row columns={1}>
            <Grid.Column style={{ maxWidth: 240 }}>
              <Upload sessionId={this.state.sessionId} refreshInterval={refreshInterval}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <DataMonitor sessionId={this.state.sessionId} files={this.props.rows} statuses={this.props.statuses} refreshInterval={refreshInterval}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Table sessionId={this.state.sessionId} clearResults={this.clearResults}/>
            </Grid.Column>
          </Grid.Row>
          {ipResults &&
          <Grid.Row >
            <Grid.Column >
              <Heatmap key="1" data={ipResults.transformedData} keys={ipResults.uniqueListOfKeys} index="firstKey" name="Destination IP" width={800} height={500}/>
            </Grid.Column>
          </Grid.Row>
          }

          {portResults &&
          <Grid.Row >
            <Grid.Column >
              <Heatmap key="1" data={portResults.transformedData} keys={portResults.uniqueListOfKeys} index="firstKey" name="Destination Port" width={800} height={1000}/>
            </Grid.Column>
          </Grid.Row>
          }
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
<<<<<<< HEAD

  const results = getResults(state);
  const toolStatuses = getToolStatuses(state);
  const wrangledData = getDataWranglingState(state);
=======
  const results = getResults(state)
  const toolStatuses = getToolStatuses(state)
>>>>>>> cf11b1644903bcb359730349b002cc06679b4c7e

  return{
    rows: results.rows || [],
    statuses: toolStatuses || {},
    vizData: wrangledData || {},
  }
};

const mapDispatchToProps = {
    setSessionId,
    fetchResults,
    fetchToolStatus,
<<<<<<< HEAD
    setHeatmapData
=======
    fetchTools,
    startFetchResults,
    stopFetchResults,
>>>>>>> cf11b1644903bcb359730349b002cc06679b4c7e
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
