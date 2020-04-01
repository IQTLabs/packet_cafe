import React from 'react';
import { connect } from "react-redux";
import * as d3 from 'd3';

import { Tab, Icon, Label } from 'semantic-ui-react';
import { ResponsiveHeatMap, HeatMap } from '@nivo/heatmap';
import './Heatmap.css';

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

const data = [
  {
    "country": "AD",
    "hot dog": 27,
    "hot dogColor": "hsl(233, 70%, 50%)",
    "burger": 50,
    "burgerColor": "hsl(257, 70%, 50%)",
    "sandwich": 57,
    "sandwichColor": "hsl(6, 70%, 50%)",
    "kebab": 18,
    "kebabColor": "hsl(95, 70%, 50%)",
    "fries": 43,
    "friesColor": "hsl(281, 70%, 50%)",
    "donut": 44,
    "donutColor": "hsl(153, 70%, 50%)",
    "junk": 7,
    "junkColor": "hsl(300, 70%, 50%)",
    "sushi": 94,
    "sushiColor": "hsl(53, 70%, 50%)",
    "ramen": 47,
    "ramenColor": "hsl(236, 70%, 50%)",
    "curry": 67,
    "curryColor": "hsl(144, 70%, 50%)",
    "udon": 35,
    "udonColor": "hsl(228, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 86,
    "hot dogColor": "hsl(129, 70%, 50%)",
    "burger": 91,
    "burgerColor": "hsl(85, 70%, 50%)",
    "sandwich": 3,
    "sandwichColor": "hsl(255, 70%, 50%)",
    "kebab": 29,
    "kebabColor": "hsl(348, 70%, 50%)",
    "fries": 7,
    "friesColor": "hsl(43, 70%, 50%)",
    "donut": 79,
    "donutColor": "hsl(70, 70%, 50%)",
    "junk": 44,
    "junkColor": "hsl(143, 70%, 50%)",
    "sushi": 25,
    "sushiColor": "hsl(304, 70%, 50%)",
    "ramen": 1,
    "ramenColor": "hsl(56, 70%, 50%)",
    "curry": 43,
    "curryColor": "hsl(319, 70%, 50%)",
    "udon": 39,
    "udonColor": "hsl(169, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 62,
    "hot dogColor": "hsl(189, 70%, 50%)",
    "burger": 13,
    "burgerColor": "hsl(330, 70%, 50%)",
    "sandwich": 95,
    "sandwichColor": "hsl(220, 70%, 50%)",
    "kebab": 89,
    "kebabColor": "hsl(74, 70%, 50%)",
    "fries": 50,
    "friesColor": "hsl(252, 70%, 50%)",
    "donut": 48,
    "donutColor": "hsl(119, 70%, 50%)",
    "junk": 79,
    "junkColor": "hsl(272, 70%, 50%)",
    "sushi": 3,
    "sushiColor": "hsl(27, 70%, 50%)",
    "ramen": 44,
    "ramenColor": "hsl(220, 70%, 50%)",
    "curry": 18,
    "curryColor": "hsl(170, 70%, 50%)",
    "udon": 18,
    "udonColor": "hsl(356, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 92,
    "hot dogColor": "hsl(24, 70%, 50%)",
    "burger": 15,
    "burgerColor": "hsl(220, 70%, 50%)",
    "sandwich": 28,
    "sandwichColor": "hsl(57, 70%, 50%)",
    "kebab": 14,
    "kebabColor": "hsl(154, 70%, 50%)",
    "fries": 75,
    "friesColor": "hsl(194, 70%, 50%)",
    "donut": 8,
    "donutColor": "hsl(314, 70%, 50%)",
    "junk": 65,
    "junkColor": "hsl(248, 70%, 50%)",
    "sushi": 59,
    "sushiColor": "hsl(14, 70%, 50%)",
    "ramen": 37,
    "ramenColor": "hsl(323, 70%, 50%)",
    "curry": 74,
    "curryColor": "hsl(6, 70%, 50%)",
    "udon": 45,
    "udonColor": "hsl(39, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 40,
    "hot dogColor": "hsl(258, 70%, 50%)",
    "burger": 32,
    "burgerColor": "hsl(54, 70%, 50%)",
    "sandwich": 77,
    "sandwichColor": "hsl(286, 70%, 50%)",
    "kebab": 32,
    "kebabColor": "hsl(329, 70%, 50%)",
    "fries": 64,
    "friesColor": "hsl(344, 70%, 50%)",
    "donut": 78,
    "donutColor": "hsl(239, 70%, 50%)",
    "junk": 9,
    "junkColor": "hsl(99, 70%, 50%)",
    "sushi": 3,
    "sushiColor": "hsl(35, 70%, 50%)",
    "ramen": 78,
    "ramenColor": "hsl(230, 70%, 50%)",
    "curry": 97,
    "curryColor": "hsl(180, 70%, 50%)",
    "udon": 13,
    "udonColor": "hsl(66, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 18,
    "hot dogColor": "hsl(107, 70%, 50%)",
    "burger": 37,
    "burgerColor": "hsl(112, 70%, 50%)",
    "sandwich": 76,
    "sandwichColor": "hsl(338, 70%, 50%)",
    "kebab": 87,
    "kebabColor": "hsl(161, 70%, 50%)",
    "fries": 75,
    "friesColor": "hsl(201, 70%, 50%)",
    "donut": 27,
    "donutColor": "hsl(160, 70%, 50%)",
    "junk": 87,
    "junkColor": "hsl(0, 70%, 50%)",
    "sushi": 32,
    "sushiColor": "hsl(293, 70%, 50%)",
    "ramen": 60,
    "ramenColor": "hsl(283, 70%, 50%)",
    "curry": 45,
    "curryColor": "hsl(113, 70%, 50%)",
    "udon": 83,
    "udonColor": "hsl(139, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 46,
    "hot dogColor": "hsl(151, 70%, 50%)",
    "burger": 37,
    "burgerColor": "hsl(218, 70%, 50%)",
    "sandwich": 27,
    "sandwichColor": "hsl(242, 70%, 50%)",
    "kebab": 47,
    "kebabColor": "hsl(356, 70%, 50%)",
    "fries": 27,
    "friesColor": "hsl(46, 70%, 50%)",
    "donut": 77,
    "donutColor": "hsl(136, 70%, 50%)",
    "junk": 23,
    "junkColor": "hsl(355, 70%, 50%)",
    "sushi": 76,
    "sushiColor": "hsl(134, 70%, 50%)",
    "ramen": 84,
    "ramenColor": "hsl(171, 70%, 50%)",
    "curry": 90,
    "curryColor": "hsl(14, 70%, 50%)",
    "udon": 39,
    "udonColor": "hsl(59, 70%, 50%)"
  },
  {
    "country": "AO",
    "hot dog": 38,
    "hot dogColor": "hsl(337, 70%, 50%)",
    "burger": 12,
    "burgerColor": "hsl(75, 70%, 50%)",
    "sandwich": 68,
    "sandwichColor": "hsl(99, 70%, 50%)",
    "kebab": 61,
    "kebabColor": "hsl(115, 70%, 50%)",
    "fries": 4,
    "friesColor": "hsl(221, 70%, 50%)",
    "donut": 2,
    "donutColor": "hsl(83, 70%, 50%)",
    "junk": 73,
    "junkColor": "hsl(303, 70%, 50%)",
    "sushi": 77,
    "sushiColor": "hsl(86, 70%, 50%)",
    "ramen": 71,
    "ramenColor": "hsl(164, 70%, 50%)",
    "curry": 41,
    "curryColor": "hsl(277, 70%, 50%)",
    "udon": 12,
    "udonColor": "hsl(97, 70%, 50%)"
  },
  {
    "country": "AQ",
    "hot dog": 12,
    "hot dogColor": "hsl(146, 70%, 50%)",
    "burger": 44,
    "burgerColor": "hsl(88, 70%, 50%)",
    "sandwich": 76,
    "sandwichColor": "hsl(78, 70%, 50%)",
    "kebab": 14,
    "kebabColor": "hsl(23, 70%, 50%)",
    "fries": 92,
    "friesColor": "hsl(214, 70%, 50%)",
    "donut": 42,
    "donutColor": "hsl(177, 70%, 50%)",
    "junk": 22,
    "junkColor": "hsl(148, 70%, 50%)",
    "sushi": 58,
    "sushiColor": "hsl(102, 70%, 50%)",
    "ramen": 14,
    "ramenColor": "hsl(196, 70%, 50%)",
    "curry": 5,
    "curryColor": "hsl(138, 70%, 50%)",
    "udon": 33,
    "udonColor": "hsl(273, 70%, 50%)"
  }
]

class Heatmap extends React.Component{

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
        cell: row => <div>{row.timestamp}</div>,
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
    const { dataJson } = this.props;
    /**
     * Unique List of Destination IP Keys
     */
    const mappedDst_ip = dataJson.map((dat)=>{
      return dat.dst_ip
    });
    const uniquemappedDst_ip = [...new Set(mappedDst_ip)];
    
    /**
     * Count of Source IP Keys by Destination IP Keys
     */

    var dataByDstIPbySrcIP = d3.nest()
      .key((d) => { return d.src_ip; })
      .key((d) => { return d.dst_ip; })
			.rollup((v) => { return v.length; })
      .object(dataJson);
     
    var counts = Object.entries(dataByDstIPbySrcIP)
      .map(([dst_ip, src_ips]) => {
        return ({ dst_ip, src_ips });
      })
    ;

    var src_ips = counts.map((dat)=>{
      return dat.src_ips
    });

    const combined = counts.map((item, i) => Object.assign({}, item, src_ips[i]));


    console.log(combined);
    
    return (
      <ResponsiveHeatMap
        data={combined}
        keys={uniquemappedDst_ip}
        indexBy="dst_ip"
        // data={data}
        // keys={[
        //   'hot dog',
        //   'burger',
        //   'sandwich',
        //   'kebab',
        //   'fries',
        //   'donut',
        //   'junk',
        //   'sushi',
        //   'ramen',
        //   'curry',
        //   'udon'
        // ]}
        // indexBy="country"
        height={500}
        width={1000}
        margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
        forceSquare={false}
        axisTop={{ orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36 }}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'dst_ip',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        cellOpacity={1}
        cellBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.4 ] ] }}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.8 ] ] }}
        defs={[
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(0, 0, 0, 0.1)',
                rotation: -45,
                lineWidth: 4,
                spacing: 7
            }
        ]}
        fill={[ { id: 'lines' } ]}
        animate={true}
        motionStiffness={80}
        motionDamping={9}
        hoverTarget="cell"
        cellHoverOthersOpacity={0.25}
    />
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

export default connect(mapStateToProps, mapDispatchToProps) (Heatmap);
