import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Grid, Button } from 'semantic-ui-react';

import { fetchResults } from 'epics/fetch-results-epic'
import { fetchToolStatus } from 'epics/fetch-status-epic'
import { setHeatmapData, setPacketStatisticsData,  getDataWranglingState } from 'domain/data_wrangling';
import { setSessionId, getResults, getToolStatuses } from 'domain/data';

import './App.css';
import Upload from 'components/upload/Upload';
import Navbar from 'components/Navbar';
import Table from 'components/table/Table.js';
import Heatmap from 'components/heatmap/Heatmap.js';
import PcapCard from 'components/pcapstats/PcapCard.js';

import mercuryData from 'components/heatmap/data.json';
import pcapStatsData from 'components/pcapstats/data.json';

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
      ipResults:null,
      portResults: null,
      packetStats:null,
      sessionId: sessionId
    };
  }
  componentDidMount(){
    this.fetchHeatmapData()
    this.fetchStatsData()
  }
  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    const { vizData } = props;
    if (vizData !== state.vizData) {
      return {
        ipResults: vizData.heatmap.ipResults,
        portResults: vizData.heatmap.portResults,
        packetStats: vizData.packetstats
      };
    }
  }

  // componentDidUpdate(prevProps){
  //   const { vizData } = this.props;
  //   if (vizData !== prevProps.vizData) {
  //       this.fetchHeatmapData()
  //       this.fetchStatsData()
  //   }
  // }

  fetchResults = () => {
      console.log("Peasant Burnination initiated...");
      this.props.fetchResults({ 'sessionId': this.state.sessionId });
      console.log("Peasant Burnination complete!");
      this.fetchHeatmapData();
  }

  fetchStatuses = () => {
      console.log("Norm Abrams is doing all of the real work....")
      for(const row of this.props.rows){
        this.props.fetchToolStatus({ 'sessionId': this.state.sessionId, 'fileId':row.id });
      }
      console.log("statuses: %o", this.props.statuses)
      console.log("This House Oldification complete")
  }

  fetchHeatmapData = async () => {
    const { setHeatmapData, rows, statuses } = this.props;
    // const { sessionId } = this.state;

    // const statusArray = Object.keys(statuses).map(key => ({
    //   tool: String(key), 
    //   id: rows[0].id,
    //   ...statuses[key]
    // }));

    // const mercury = statusArray.filter((data)=>{
    //     return data.tool === "mercury"
    // })

    // console.log(mercury);

    // const url = `/raw/${sessionId}/${mercury[0].id}/${mercury[0].tool}`;
    // console.log(url);

    // if(mercury[0].status == "Complete"){
    //   await fetch(url)
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((jsonData) => {
          var ipData = {
            type:"ip",
            // data:jsonData[0],
            data:mercuryData,
            firstKey:"dst_ip",
            secondKey:"src_ip"
          }
    
          setHeatmapData(ipData);
    
          var portData = {
            type:"port",
            // data:jsonData[0],
            data: mercuryData,
            firstKey:"dst_port",
            secondKey:"src_port"
          }
    
          setHeatmapData(portData);
    //     });
    //  }

  }

  fetchStatsData = async () => {
    const { setPacketStatisticsData, rows, statuses } = this.props;

    const tsharkObject = pcapStatsData[0]['tshark'];

    setPacketStatisticsData(tsharkObject)
  }

  handleCookies = (termsAccepted) => {
    const { cookies } = this.props;
    cookies.set('sessionID', this.state.sessionId, { 
      path: '/',
      maxAge:'3600' 
    });
    cookies.set('termsAccepted', termsAccepted, { 
      path: '/',
      maxAge:'3600'
    });
  }

  render() { 
    const { ipResults, portResults, packetStats } = this.state; 
    console.log(ipResults, portResults, packetStats) 

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
              <Table sessionId={this.state.sessionId}/>
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

          {packetStats &&
            <Grid.Row columns={3} >
              <Grid.Column>
                {packetStats.map((item, key)=>{
                  return(<PcapCard subtitle={"Average Bytes Size"} title={item["Average Bytes Size"]} />)
                })}
              </Grid.Column>
              <Grid.Column>
                {packetStats.map((item, key)=>{
                  return(<PcapCard subtitle={"Percentage of Total Packet Size"} title={item["Percentage of Total Packet Size"]} />)
                })}
              </Grid.Column>
              <Grid.Column>
                {packetStats.map((item, key)=>{
                  return(<PcapCard subtitle={"Percentage of Total Byte Size"} title={item["Percentage of Total Byte Size"]} />)
                })}
              </Grid.Column>
            </Grid.Row>
          } 
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const results = getResults(state);
  const toolStatuses = getToolStatuses(state);
  const wrangledData = getDataWranglingState(state);

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
    setHeatmapData,
    setPacketStatisticsData
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
