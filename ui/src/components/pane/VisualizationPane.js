import React from 'react';
import { connect } from 'react-redux';

import { Tab } from 'semantic-ui-react';

import { startFetchResults, stopFetchResults } from "epics/auto-fetch-results-epic"
import { fetchResults } from 'epics/fetch-results-epic'
import { fetchToolStatus } from 'epics/fetch-status-epic'
import { fetchTools } from 'epics/fetch-tools-epic'
import { setPacketStatisticsData,  getDataWranglingState, configureHeatmapData } from 'domain/data_wrangling';
import { getResults, getToolStatuses, getToolResults } from 'domain/data';

import Table from 'components/table/Table';


class VizualizationPane extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ipResults:null,
      portResults: null,
      packetStats:null,
    };
  }

  componentDidMount(){
    this.props.fetchTools();
  }

  getPanes = () => {

    return[
      {
        menuItem: "Data Status",
        render: () =>
          <Tab.Pane attached={true}>
            <Table sessionId={this.props.sessionId} fileId={this.props.fileId} clearResults={this.props.clearResults}/>
          </Tab.Pane>
      }
    ];
  }
  
  render() {
    

    return (
      <>
        <Tab menu={{ secondary: true }} panes={this.getPanes()} />
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
    fetchResults,
    fetchToolStatus,
    fetchTools,
    startFetchResults,
    stopFetchResults,
    setPacketStatisticsData
};

export default connect(mapStateToProps, mapDispatchToProps)(VizualizationPane);