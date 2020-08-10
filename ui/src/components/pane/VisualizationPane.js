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
import Heatmap from 'components/heatmap/Heatmap';

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
    let { ipResults, portResults } = this.state; 

    return[
      {
        menuItem: "Data Status",
        render: () =>
          <Tab.Pane attached={true}>
            <Table sessionId={this.props.sessionId} fileId={this.props.fileId} clearResults={this.clearResults}/>
          </Tab.Pane>
      },
      {
        menuItem: "IP Heatmap",
        render: () =>
          <Tab.Pane attached={true}>
            <Heatmap key="1" data={ipResults.data} keys={ipResults.keys} index="firstKey" name="Destination IP" width={800} height={500}/>
          </Tab.Pane>
      },
      {
        menuItem: "Port Heatmap",
        render: () =>
          <Tab.Pane attached={true}>
            <Heatmap key="1" data={portResults.data} keys={portResults.keys} index="firstKey" name="Destination Port" width={800} height={500}/>
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