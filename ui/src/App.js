import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Grid, Button } from 'semantic-ui-react';

import { fetchResults } from 'epics/fetch-results-epic'
import { fetchToolStatus } from 'epics/fetch-status-epic'
import { getResults, getToolStatuses } from 'domain/data';
import { setHeatmapData, getDataWranglingState } from 'domain/data_wrangling';

import './App.css';
import Upload from 'components/upload/Upload';
import Navbar from 'components/Navbar';
import Table from 'components/table/Table.js';
import Heatmap from 'components/heatmap/Heatmap.js';

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
      this.fetchHeatmapData();
  }

  fetchStatuses = () => {
      console.log("Norm Abrams is doing all of the real work....")
      for(const row of this.props.rows){
        this.props.fetchToolStatus({ 'sessionId': SESSION_ID, 'fileId':row.id });
      }
      console.log("statuses: %o", this.props.statuses)
      console.log("This House Oldification complete")
  }

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

    const url = `/raw/${sessionId}/${mercury[0].id}/${mercury[0].tool}`;

    if(mercury[0].status == "Complete"){
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          var data = {
            type:"ip",
            data:jsonData[0],
            firstKey:"dst_ip",
            secondKey:"src_ip"
          }
    
          setHeatmapData(data);
    
          var data = {
            type:"port",
            data:jsonData[0],
            firstKey:"dst_port",
            secondKey:"src_port"
          }
    
          setHeatmapData(data);
        });
    }

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
    const { ipResults, portResults } = this.props.vizData.heatmap;

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
              <Heatmap key="2" data={portResults.transformedData} keys={portResults.uniqueListOfKeys} index="firstKey" name="Destination Port" width={800} height={1000}/>
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
    fetchResults,
    fetchToolStatus,
    setHeatmapData
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
