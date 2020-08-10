import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Tab, Grid } from 'semantic-ui-react';

import { startFetchResults, stopFetchResults } from "epics/auto-fetch-results-epic"
import { fetchResults } from 'epics/fetch-results-epic'
import { fetchToolStatus } from 'epics/fetch-status-epic'
import { fetchTools } from 'epics/fetch-tools-epic'
import { setPacketStatisticsData,  getDataWranglingState, configureHeatmapData } from 'domain/data_wrangling';
import { setSessionId, getResults, getToolStatuses, getToolResults } from 'domain/data';

import './App.css';
import Upload from 'components/upload/Upload';
import Navbar from 'components/Navbar';
import DataMonitor from 'components/data/DataMonitor';
import VisualizationPane from 'components/pane/VisualizationPane';

import pcapStatsData from 'components/pcapstats/data.json';

const COOKIE_NAME = 'sessionID'

const formatHeatmapData = (files, results) => {
    const selectedFile = files.length > 0 ? files[0].id : "";
    const statusArray = !results[selectedFile] ? [] : Object.keys(results[selectedFile]).map(key => ({
      tool: String(key), 
      id: selectedFile,
      results: results[selectedFile][key]
    })) 

    const mercury = statusArray.filter((data)=>{
        return data.tool === "mercury"
    })

    const mercuryResults = mercury.length > 0 && mercury[0].results.length > 0 ? mercury[0].results[0] : []; 

    var ipData = {
      type:"ip",
      // data:jsonData[0],
      data:mercuryResults,
      firstKey:"dst_ip",
      secondKey:"src_ip"
    }

    ipData = configureHeatmapData(ipData)

    var portData = {
      type:"port",
      // data:jsonData[0],
      data: mercuryResults,
      firstKey:"dst_port",
      secondKey:"src_port"
    }

    portData = configureHeatmapData(portData)

    return { 'ipResults': ipData, 'portResults': portData }
  }

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
      ipResults:null,
      portResults: null,
      packetStats:null,
      sessionId: sessionId
    };
  }

  componentDidMount(){
    this.props.fetchTools();
    this.fetchStatsData()
  }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    const { vizData } = props;
    const hmData = formatHeatmapData(props.files, props.results);

    if (hmData !== state.vizData) {
      return {
        ipResults: hmData.ipResults,
        portResults: hmData.portResults,
        packetStats: vizData.packetstats
      };
    }
  }

  getPanes = () => {
    return this.props.files.map((file) =>{
      return {
        menuItem: file.filename,
        render: () =>
          <Tab.Pane attached={true}>
            <VisualizationPane sessionId={this.state.sessionId} fileId={file.id} files={this.props.files} results={this.props.results} clearResults={this.clearResults}/>
          </Tab.Pane>
      }
    })
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

  fetchStatsData = async () => {
    const { setPacketStatisticsData } = this.props;

    const tsharkObject = pcapStatsData[0]['tshark'];

    setPacketStatisticsData(tsharkObject);
  }
  
  render() {
    const refreshInterval = this.props.refreshInterval 

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
              <DataMonitor sessionId={this.state.sessionId} files={this.props.files} statuses={this.props.statuses} refreshInterval={refreshInterval}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Tab menu={{ secondary: true }} panes={this.getPanes()} />
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const results = getResults(state);
  const toolStatuses = getToolStatuses(state);
  const toolResults = getToolResults(state);
  const wrangledData = getDataWranglingState(state);

  return{
    files: results.rows || [],
    statuses: toolStatuses || {},
    results: toolResults || {},
    vizData: wrangledData || {},
  }
};

const mapDispatchToProps = {
    setSessionId,
    fetchResults,
    fetchToolStatus,
    fetchTools,
    startFetchResults,
    stopFetchResults,
    setPacketStatisticsData
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));