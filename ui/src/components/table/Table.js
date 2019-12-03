import React from 'react';
//import ReactDOM from 'react-dom';
import DataTable from 'react-data-table-component';

import {
  chain,
  concat,
  find,
  // fromPairs,
  // identity,
  is,
  map,
  merge,
  // path,
  //pipe,
  propEq,
  //sortBy,
  toPairs,
  //uniq,
} from "ramda";

/**
 * Returns an array of paths to literal values and arrays in a POJO.
 *
 * Example:
 * pathsIn({ a: 'A', b: { c: 'C', d: [1, 2] } }) //=> [['a'], ['b', 'c'], ['b', 'd']]
 */
const pathsIn = (obj) =>
  chain(
    ([key, value]) =>
      is(Object, value) ? map(concat([key]), pathsIn(value)) : [[key]],
    toPairs(obj)
  );

/**
 * Return all fields for an object
 */
const fieldsFor = (obj, overrides = []) => {
  const paths = pathsIn(obj).filter(p => p[0] !== 'CRVIZ');
  return map((path) => {
    const override = find(propEq('path', path), overrides) || {};
    return merge(
      {
        title: path.join('.'),
        prop: path.join('.')
      },
      override
    )
  }, paths);
}



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
        return(
          <p key={id + ":" +value}>
            <a href={'/results/${this.props.sessionId}/${id}/${value}'} target="_blank">
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


  // buildTable(data) {
  //   const allRowsUrls = {};
  //   const allRowsTools = {};

  //   for (const [val, row] of data.entries()) {
  //     const getResultUrls = [];
  //     const tools = row.tools;
  //     const id = row.id;
  //     for (const [index, value] of tools.entries()) {
  //       getResultUrls.push(<a href={`/results/${this.props.sessionId}/${id}/${value}`} target="_blank">
  //         {value}
  //       </a>);
  //     }
  //     const htmlUrls = getResultUrls.map((url) =>
  //       <p>{url}</p>
  //     );
  //     allRowsUrls[id] = htmlUrls;
  //   }

  //   const renderResultsUrl =
  //     (val, row) => allRowsUrls[row["id"]];

  //   for (const [val, row] of data.entries()) {
  //     const getTools = [];
  //     const tools = row.tools;
  //     for (const [index, value] of tools.entries()) {
  //       getTools.push(<p>{value}</p>);
  //     }
  //     allRowsTools[row.id] = getTools;
  //   }

  //   const renderTools =
  //     (val, row) => allRowsTools[row["id"]];

  //   const tableColumns = [
  //     { title: 'ID', prop: 'id' },
  //     { title: 'Filename', prop: 'filename' },
  //     // { title: 'Tools', render: renderTools, className: 'text-center' },
  //     // { title: 'Results', render: renderResultsUrl, className: 'text-center' },
  //     { title: 'Report', prop: 'report', defaultContent: 'no report available' },
  //   ];
  // }

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
    const { hits, isLoading, columns, rows } = this.state;
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
