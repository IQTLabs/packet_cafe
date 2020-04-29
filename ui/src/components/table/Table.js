import React from 'react';
import DataTable from 'react-data-table-component';
import { connect } from "react-redux";

import { Tab, Icon, Label, Button } from 'semantic-ui-react';
import './Table.css';

import { getResults, getToolStatuses, getTools } from 'domain/data';
import { fetchToolStatus } from 'epics/fetch-status-epic'

const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};

const getStatusArray = (fileId, fileStatuses) => {
  var statusArray = [];
  const statuses = fileStatuses[fileId];

  if(statuses){
    statusArray = Object.keys(statuses).map(key => ({
      id: fileId + "-" + String(key),
      tool: String(key),
      fileId: fileId,
      ...statuses[key]
    }));
  }
  return statusArray;
}

const getPanes = (results, statuses, columns, tableLoading) => {
  return results.map((result) =>{
    return {
      menuItem: result.filename,
      render: () =>
        <Tab.Pane attached={true}>
          <DataTable
            keyField="id"
            title={result.id}
            columns={columns}
            data={getStatusArray(result.id, statuses)}
            progressPending={tableLoading}
            customStyles={customStyles}
          />
        </Tab.Pane>
    }
  })
}

class Table extends React.Component{

  fetchStatuses = () => {
      for(const row of this.props.rows){
        this.props.fetchToolStatus({ 'sessionId': this.props.sessionId, 'fileId':row.id });
      }
  }

  fetchResults = () => {
      this.props.fetchResults({ 'sessionId': this.props.sessionId });
  }

  //NEW
  renderTool = (item, type) => {
    const id = item.id;
    const fileId = item.fileId;
    const value = item.tool;
    for(const tool of this.props.tools){
      if(tool.name === value && !tool.viewableOutput) {
        return(
          <p>Tool does not generate results.</p>
        )
      }
    }

    const url = `/${type}/${this.props.sessionId}/${fileId}/${value}`
    return(
      <p key={id + ":" +value}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Label>Open {value} {type}</Label>
        </a>
      </p>
    )
  }

  //NEW
  getToolsTableColumns = () => {
    const tableColumns = [
      { name: 'Tool', className: '',
        cell: row => <div>{row.tool}</div>,
      },
      { name: 'Status', className: '',
        cell: row => <div>
            {row.status === 'Queued' && <Icon title="Queued" color='grey' size='big' name='pause circle' />}
            {row.status === 'In progress' && <Icon title="In Progress" loading size='big' color='yellow' name='cog' />}
            {row.status === 'Complete' && <Icon title="Complete" size='big' color='green' name='check circle' />}
          </div>,
      },
      { name: 'Timestamp', className: '',
        cell: row => {
            const d = new Date(0);
            d.setUTCSeconds(row.timestamp/1000);
            return <div>{d.toString().split("GMT")[0]}</div>
        },
      },
      { name: 'Results', className: 'text-center',
        cell: row => <div>{this.renderTool(row, 'results')}</div>,
      },
      { name: 'Results (Raw)', className: 'text-center',
        cell: row => <div>{this.renderTool(row, 'raw')}</div>,
      },
    ];

    return tableColumns;
  }

  render() {
    const columns = this.getToolsTableColumns();
    const { rows, isLoading, statuses } = this.props;
    return (
      <div>
        <div className="buttonContainer">
          <Button circular basic color='green' className={` ${rows && rows.length > 0 ? '' : 'hidden'}`} onClick={this.fetchResults}>
            Refresh Files
          </Button>
          <Button circular basic color='teal' className={` ${statuses && Object.keys(statuses).length > 0 ? '' : 'hidden'}`} onClick={this.fetchStatuses}>
            Refresh Statuses
          </Button>
          <Button circular basic color='orange' className={` ${(rows || statuses) && (rows.length > 0 || Object.keys(statuses).length > 0 ) ? '' : 'hidden'}`} onClick={this.props.clearResults}>
            Clear Results
          </Button>
        </div>
        <Tab className={` ${rows === undefined || rows.length === 0 ? '' : 'Table'}`} menu={{ secondary: true }} panes={getPanes(rows, statuses, columns, isLoading)} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const results = getResults(state);
  const toolStatuses = getToolStatuses(state);
  const tools = getTools(state);
  return{
    rows: results.rows || [],
    statuses: toolStatuses || {},
    tools: tools || [],
  }
};

const mapDispatchToProps = {
    fetchToolStatus,
};

export default connect(mapStateToProps, mapDispatchToProps) (Table);
