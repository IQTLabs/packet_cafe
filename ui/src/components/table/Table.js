import React from 'react';
import DataTable from 'react-data-table-component';
import { connect } from "react-redux";

import { Tab, Icon, Label } from 'semantic-ui-react';
import './Table.css';

import { getResults, getToolStatuses } from 'domain/data';

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

const getPanes = (results, statuses, columns, tableLoading) => {
  // handle case if results is an empty list
  var statusArray = [];
  if (results.length > 0) {
    statusArray = Object.keys(statuses).map(key => ({
      tool: String(key),
      id: results[0].id,
      ...statuses[key]
    }));
  }
  console.log(statusArray);
  console.log(results);
  return results.map(function(result){
    return {
      menuItem: result.filename,
      render: () =>
        <Tab.Pane attached={true}>
          <DataTable
            keyField="id"
            title={result.id}
            columns={columns}
            data={statusArray}
            progressPending={tableLoading}
            customStyles={customStyles}
          />
        </Tab.Pane>
    }
  })
}

class Table extends React.Component{

  renderTools = (item, type) => {
    const tools = item.tools;
    const id = item.id;
    return tools.map((value) => {
        const url = `/${type}/${this.props.sessionId}/${id}/${value}`
        return(
          <p key={id + ":" +value}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          </p>
        )
      }
    );
  }

  //NEW
  renderTool = (item, type) => {
    const id = item.id;
    const value = item.tool;
    const url = `/${type}/${this.props.sessionId}/${id}/${value}`
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
            {row.status == 'Queued' && <Icon title="Queued" color='grey' size='big' name='pause circle' />}
            {row.status == 'In progress' && <Icon title="In Progress" loading size='big' color='yellow' name='cog' />}
            {row.status == 'Complete' && <Icon title="Complete" size='big' color='green' name='check circle' />}
          </div>,
      },
      { name: 'Timestamp', className: '',
        //cell: row => <div>{d.setUTCSeconds(row.timestamp)}</div>,
        //var d = new Date(0);
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
      <Tab className={` ${rows === undefined || rows.length == 0 ? '' : 'Table'}`} menu={{ secondary: true }} panes={getPanes(rows, statuses, columns, isLoading)} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const results = getResults(state);
  const toolStatuses = getToolStatuses(state);
  return{
    rows: results.rows || [],
    statuses: toolStatuses || {},
  }
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps) (Table);
