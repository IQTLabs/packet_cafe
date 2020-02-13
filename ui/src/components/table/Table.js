import React from 'react';
import DataTable from 'react-data-table-component';
import { connect } from "react-redux";

import { Tab, Icon } from 'semantic-ui-react';
import './Table.css';


import { getResults, getToolStatuses } from 'domain/data';

function getPanes(results, statuses, columns){
  const statusArray = Object.keys(statuses).map(key => ({
    tool: String(key), 
    ...statuses[key]
  }));
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

  renderStatus = (item) => {
    const id = item.id;
    const url = `/status/${this.props.sessionId}/${id}`;
    return(
          <p key={id}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Check Status
            </a>
          </p>
    );
  }

  getTableColumns = () => {
    const tableColumns = [
      // { name: 'ID', selector: 'id' },
      // { name: 'Filename', selector: 'original_filename' },
      { name: 'Tools', className: 'text-center',
        cell: row => <div>{this.renderTools(row, 'results')}</div>,
      },
      { name: 'Tools (Raw)', className: 'text-center',
        cell: row => <div>{this.renderTools(row, 'raw')}</div>,
      },
      // { title: 'Results', render: renderResultsUrl, className: 'text-center' },
      { name: 'Report', selector: 'report', cell: row => <p>{ row.report ? row.report : 'no report available' }</p> },
      { name: 'Status', className: 'text-center',
        cell: row => <div>{this.renderStatus(row)}</div>,
      },
    ];

    return tableColumns;
  }

  getToolsTableColumns = () => {
    const tableColumns = [
      { name: 'Tool', className: '',
        cell: row => <div>{row.tool}</div>,
      },
      { name: 'Status', className: '',
        cell: row => <div>
            {row.status == 'Queued' && <Icon color='grey' size='big' name='pause circle' />}
            {row.status == 'In progress' && <Icon loading size='big' color='yellow' name='cog' />}
            {row.status == 'Complete' && <Icon size='big' color='green' name='check circle' />}
          </div>,
      },
      { name: 'Timestamp', className: '',
        cell: row => <div>{row.timestamp}</div>,
      },
    ];

    return tableColumns;
  }

  render() {
    // const columns = this.getTableColumns();
    const columns = this.getToolsTableColumns();
    const { rows, isLoading, statuses } = this.props;
    
    return (
      <Tab className={` ${rows === undefined || rows.length == 0 ? '' : 'Table'}`} menu={{ secondary: true }} panes={getPanes(rows, statuses, columns)} />
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
