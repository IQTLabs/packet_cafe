import React from 'react';
import { connect } from "react-redux";

import { Tab, Icon, Label } from 'semantic-ui-react';
import { ResponsiveHeatMap, HeatMap } from '@nivo/heatmap';
import './Heatmap.css';

class Heatmap extends React.Component{

  render() {
    const { data, keys, index, name, height, width} = this.props;
    
    return (
      <ResponsiveHeatMap
        data={data}
        keys={keys}
        indexBy={index}
        height={height}
        width={width}
        margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
        forceSquare={false}
        axisTop={{ orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36 }}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: name,
            legendPosition: 'middle',
            legendOffset: -80
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

        minValue={1}
        // sizeVariation={.15}
        cellShape="rect"
    />
    )
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps) (Heatmap);
