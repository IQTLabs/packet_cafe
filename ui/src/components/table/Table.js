import React from 'react';
//import ReactDOM from 'react-dom';
import DataTable from 'react-data-table-component';

class Table extends React.Component{
  constructor(props) {
    super(props);

    // this.buildTable = this.buildTable.bind(this);
    this.updateData = this.updateData.bind(this);
    this.state = {
      rows: [],
      isLoading: false,
      columns:[{ name: 'ID', selector: 'id' }],
    };
  }

  renderTools = (item) => {
    const tools = item.tools;
    const id = item.id;
    console.log(tools);
    return tools.map((value) => {
        const url = `/results/${this.props.sessionId}/${id}/${value}`
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

  getTableColumns = () => {
    const tableColumns = [
      { name: 'ID', selector: 'id' },
      { name: 'Filename', selector: 'filename' },
      { name: 'Tools', className: 'text-center',
        cell: row => <div>{this.renderTools(row)}</div>,
      },
      // { title: 'Results', render: renderResultsUrl, className: 'text-center' },
      { name: 'Report', selector: 'report', cell: row => <p>{ row.report ? row.report : 'no report available' }</p> },
    ];

    return tableColumns;
  }

  componentDidMount() {
    this.updateData()
  }

  updateData() {
    this.setState({ isLoading: true });
    // const data2 = [{"id": "ac3bc8a9be3541de9763e237332dbb5b", "filename": "printer-18-06-06.pcap", "tools": ["pcap_stats", "networkml", "pcapplot", "p0f", "snort"]}]
    // this.setState({ rows: data2, columns: this.getTableColumns(data2), isLoading: false })
    fetch('/ids/' + this.props.sessionId)
      .then(res => res.json())
      .then(data => this.setState({ rows: data, columns: this.getTableColumns(), isLoading: false }))
      .then(() => this.render())
  }

  render() {
    const { isLoading, columns, rows } = this.state;
    console.log(columns);
    return (
        <div>
          <button onClick={this.updateData}>
            Activate Lasers
          </button>
          <DataTable
            className="container"
            keyField="id"
            columns={columns}
            data={rows}
            //pagination={false}
            //initialPageLength={5}
            //initialSortBy={{ prop: 'filename', order: 'descending' }}
            progressPending={isLoading}
            //pageLengthOptions={[ 5, 20, 50 ]}
          />
      </div>)
  }
}

export default Table;
