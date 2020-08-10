import React from 'react';
import { connect } from "react-redux";

import './PcapCard.css';

class PcapCard extends React.Component{

  render() {
    const { title, subtitle} = this.props;
    
    return (
      <>
        <h6>{subtitle}</h6>
        <h1>{title}</h1>
      </>
    )
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps) (PcapCard);
