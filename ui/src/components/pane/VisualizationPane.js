import React from 'react';
import { connect } from 'react-redux';

import { Tab } from 'semantic-ui-react';

import { fetchTools } from 'epics/fetch-tools-epic'

import Table from 'components/table/Table';


class VizualizationPane extends React.Component {

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

const mapStateToProps = null;

const mapDispatchToProps = {
    fetchTools,
};

export default connect(mapStateToProps, mapDispatchToProps)(VizualizationPane);