import React from 'react';
import ReactDOM from 'react-dom';
import { DataTable } from 'react-data-components';

class Table extends React.Component{
  constructor(props) {
    super(props);

    this.buildTable = this.buildTable.bind(this);
    this.state = {
      rows: "",
      isLoading: false,
    };
  }

  // TODO use real data
  buildTable(data) {
    const renderMapUrl =
      (val, row) =>
        <a href={`https://www.google.com/maps?q=${row['lat']},${row['long']}`}>
          Google Maps
        </a>;

    const tableColumns = [
      { title: 'Name', prop: 'name' },
      { title: 'City', prop: 'city' },
      { title: 'Street address', prop: 'street' },
      { title: 'Phone', prop: 'phone', defaultContent: '<no phone>' },
      { title: 'Map', render: renderMapUrl, className: 'text-center' },
    ];

    return ( <DataTable
        className="container"
        keys="id"
        columns={tableColumns}
        initialData={data}
        initialPageLength={10}
        initialSortBy={{ prop: 'city', order: 'descending' }}
        //pageLengthOptions={[ 5, 20, 50 ]}
      />
    );
  }

  // TODO fetch real API
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('/data.json')
      .then(res => res.json())
      .then((rows) => {
        ReactDOM.render(this.buildTable(rows), document.getElementById('table'));
      })
      .then(data => this.setState({ rows: data, isLoading: false }));
  }

  render() {
    const { hits, isLoading } = this.state;

    if (isLoading) {
      return <div><p>Loading ...</p></div>;
    }
    return null;
  }
}

export default Table
