import React from 'react';
import { connect } from 'react-redux';

import { Tab, Grid } from 'semantic-ui-react';

import { startFetchResults, stopFetchResults } from "epics/auto-fetch-results-epic"
import { fetchResults } from 'epics/fetch-results-epic'
import { fetchToolStatus } from 'epics/fetch-status-epic'
import { fetchTools } from 'epics/fetch-tools-epic'
import { setPacketStatisticsData,  getDataWranglingState, configureHeatmapData } from 'domain/data_wrangling';
import { setSessionId, setFileId, getResults, getToolStatuses, getToolResults } from 'domain/data';

import './Home.css';
import Upload from 'components/upload/Upload';
import DataMonitor from 'components/data/DataMonitor';
import VisualizationPane from 'components/pane/VisualizationPane';

import pcapStatsData from 'components/pcapstats/data.json';

class Home extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      ipResults:null,
      portResults: null,
      packetStats:null
    };
  }


  componentDidMount(){
    this.props.fetchTools();
    this.fetchStatsData()
  }

  handlePaneChange = (e, data) => {
    const fileId = data.panes[data.activeIndex].menuItem.id;
    this.props.setFileId(fileId);
  }

  componentWillUnmount() {
    this.props.stopFetchResults();
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
        <Grid textAlign='center' container style={{ height: '85vh' }}>
          <Grid.Row columns={1}>
            <Grid.Column style={{ maxWidth: 240 }}>
              <Upload sessionId={this.props.sessionId} refreshInterval={refreshInterval}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <DataMonitor sessionId={this.props.sessionId} files={this.props.files} statuses={this.props.statuses} refreshInterval={refreshInterval}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <VisualizationPane sessionId={this.state.sessionId} fileId={this.props.fileId} files={this.props.files} results={this.props.results} clearResults={this.clearResults}/>
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
    setFileId,
    fetchResults,
    fetchToolStatus,
    fetchTools,
    startFetchResults,
    stopFetchResults,
    setPacketStatisticsData
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);