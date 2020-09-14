import React from 'react';
import { connect } from "react-redux";

import './DeviceSummary.css';

class DeviceSummary extends React.Component{	
	render () {
		return (
      <div>
        <title>PCAPviz {'\xBB'} Device Details</title>

        <div className="ui grid">
          <div className="row">
            <div className="one wide column" />
            <div className="fifteen wide column">
              <div className="ui inline piled segment">
                <h1 className="ui header">
                  smallFlows.pcap
                  <div className="sub header">
                    Analyzed: <span id="date" />
                  </div>
                </h1>
                <div className="ui two column grid">
                  <div className="row">
                    <div className="column">
                      <table className="ui large definition table">
                        <tbody>
                          <tr>
                            <td>Filename</td>
                            <td>../smallFlows.pcap</td>
                          </tr>
                          <tr>
                            <td>Capture duration</td>
                            <td>298.5 seconds</td>
                          </tr>
                          <tr>
                            <td>Total packets</td>
                            <td>14,261</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="column">
                      <table className="ui large definition table">
                        <tbody>
                          <tr>
                            <td>File size</td>
                            <td>9,444 kB</td>
                          </tr>
                          <tr>
                            <td>Data size</td>
                            <td>9,216 kB</td>
                          </tr>
                          <tr>
                            <td>Average packet size</td>
                            <td>646.28 bytes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <h2>Device Summary</h2>
                <div className="ui three column grid">
                  <div className="equal width row">
                    <div className="two wide column">
                      <div className="ui small horizontal statistics">
                        <div className="statistic">
                          <div className="ui circular grey label value">12</div>
                          <div className="label">
                            Devices
                            <br />
                            Total
                          </div>
                        </div>
                        <div className="statistic">
                          <div className="ui circular teal label value">3</div>
                          <div className="label">
                            Devices
                            <br />
                            Selected
                          </div>
                        </div>
                      </div>
                      <br />
                    </div>
                    <div className="one wide column" />
                    <div className="column">
                      <div className="ui five cards">
                        <div className="ui card">
                          <div className="content">
                            <div className="right floated author">
                              <i className="right floated fal fa-computer-classic fa-4x" />
                              <br />
                            </div>
                            <div className="floating massive ui grey circular label">
                              5
                            </div>
                            <div className="description">Overall confidence 82%</div>
                          </div>
                          <div className="ui bottom attached left aligned button">
                            Business
                            <br />
                            Workstation(s)&nbsp;»
                          </div>
                        </div>
                        <div className="ui card">
                          <div className="content">
                            <div className="right floated author">
                              <i className="right floated fal fa-server fa-4x" />
                              <br />
                            </div>
                            <div className="floating massive ui teal circular label">
                              3
                            </div>
                            <div className="description">Overall confidence 70%</div>
                          </div>
                          <a
                            className="ui bottom active attached left aligned button"
                            href="../03-Devices/index.html"
                          >
                            Administrative
                            <br />
                            Server(s)&nbsp;»
                          </a>
                        </div>
                        <div className="ui card">
                          <div className="content">
                            <div className="right floated author">
                              <i className="right floated fab fa-git-alt fa-4x" />
                              <br />
                            </div>
                            <div className="floating massive ui grey circular label">
                              2
                            </div>
                            <div className="description">Overall confidence 65%</div>
                          </div>
                          <div className="ui bottom attached left aligned button">
                            Internal Git
                            <br />
                            Server(s)&nbsp;»
                          </div>
                        </div>
                        <div className="ui card">
                          <div className="content">
                            <div className="right floated author">
                              <i className="right floated fal fa-laptop-code fa-4x" />
                              <br />
                            </div>
                            <div className="floating massive ui grey circular label">
                              1
                            </div>
                            <div className="description">Overall confidence 60%</div>
                          </div>
                          <div className="ui bottom attached left aligned button">
                            GPU
                            <br />
                            Laptop(s)&nbsp;»
                          </div>
                        </div>
                        <div className="ui card">
                          <div className="content">
                            <div className="right floated author">
                              <i className="right floated fas fa-question-circle fa-4x" />
                              <br />
                            </div>
                            <div className="floating massive ui grey circular label">
                              1
                            </div>
                            <div className="description">Overall confidence 41%</div>
                          </div>
                          <div className="ui bottom attached left aligned button">
                            Unknown
                            <br />
                            Device(s)&nbsp;»
                          </div>
                        </div>
                      </div>
                      <div className="ui info large message">
                        <i className="close icon" />
                        <div className="header">
                          Where do these device labels come from?
                        </div>
                        <p>
                          PCAPviz relies on NetworkML to perform device role
                          identification. This machine learning model takes
                          host-/session-level network traffic and infers each device's
                          functional role (e.g. printer or e-mail server). Individual
                          device details appear in the table below.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <h2>Device Roles/Traffic Details</h2>
                <table
                  id="devicedetails"
                  className="ui sortable celled table"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Device</th>
                      <th>OS</th>
                      <th>IP</th>
                      <th>MAC</th>
                      <th>Primary Label</th>
                      <th>Secondary Label</th>
                      <th>Tertiary Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="../05-Ports/">
                          <h3>
                            Inventec
                            <br />
                            2CAB00
                          </h3>
                        </a>
                      </td>
                      <td>Linux</td>
                      <td className="collapsing">10.0.2.15</td>
                      <td className="collapsing">40:61:86:9a:f1:f5</td>
                      <td>
                        <i className="bottom aligned fas fa-server seventyfive fa-4x">
                          {" "}
                        </i>
                        <div className="ui left pointing teal label">
                          <div className="ui white floated statistic">
                            <div className="value">
                              <h1 className="ui header prime">
                                75%
                                <div className="sub header" style={{ fontSize: 12 }}>
                                  confidence
                                  <br />
                                  this device is an
                                  <br />
                                  admin. server
                                </div>
                              </h1>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <i className="bottom aligned fab fa-confluence twenty fa-4x">
                          {" "}
                        </i>
                        <div className="ui left pointing basic label">
                          <div className="ui floated statistic">
                            <div className="value">
                              <h1 className="ui header">
                                20%
                                <div className="sub header" style={{ fontSize: 12 }}>
                                  confidence
                                  <br />
                                  this device is a<br />
                                  Confluence server
                                </div>
                              </h1>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <i className="bottom aligned fas fa-key-skeleton five fa-4x">
                          {" "}
                        </i>
                        <div className="ui left pointing basic label">
                          <div className="ui floated statistic">
                            <div className="value">
                              <h1 className="ui header">
                                5%
                                <div className="sub header" style={{ fontSize: 12 }}>
                                  confidence
                                  <br />
                                  this device is a<br />
                                  PKI Server
                                </div>
                              </h1>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="../05-Ports/">
                          <h3>
                            Super Micro
                            <br />
                            68D93C
                          </h3>
                        </a>
                      </td>
                      <td>Windows 7</td>
                      <td>67.215.65.132</td>
                      <td>08:00:27:cc:3f:1b</td>
                      <td>
                        <i className="bottom aligned fas fa-server seventyfive fa-4x">
                          {" "}
                        </i>
                        <div className="ui left pointing teal label">
                          <div className="ui floated statistic">
                            <div className="value">
                              <h1 className="ui header prime">
                                75%
                                <div className="sub header" style={{ fontSize: 12 }}>
                                  confidence
                                  <br />
                                  this device is an
                                  <br />
                                  admin. server
                                </div>
                              </h1>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <i className="bottom aligned fas fa-key-skeleton twenty fa-4x">
                          {" "}
                        </i>
                        <div className="ui left pointing basic label">
                          <div className="ui floated statistic">
                            <div className="value">
                              <h1 className="ui header">
                                20%
                                <div className="sub header" style={{ fontSize: 12 }}>
                                  confidence
                                  <br />
                                  this device is a<br />
                                  PKI Server
                                </div>
                              </h1>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <i className="bottom aligned fas fa-print five fa-4x"> </i>
                        <div className="ui left pointing basic label">
                          <div className="ui floated statistic">
                            <div className="value">
                              <h1 className="ui header">
                                5%
                                <div className="sub header" style={{ fontSize: 12 }}>
                                  confidence
                                  <br />
                                  this device is a<br />
                                  Printer
                                </div>
                              </h1>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="../05-Ports/">
                          <h3>
                            Super Micro
                            <br />
                            9C8E99
                          </h3>
                        </a>
                      </td>
                      <td>Windows 7</td>
                      <td>172.16.255.1</td>
                      <td>00:1e:68:51:4f:a9</td>
                      <td>
                        <i className="bottom aligned fas fa-server seventyfive fa-4x">
                          {" "}
                        </i>
                        <div className="ui left pointing teal label">
                          <div className="ui floated statistic">
                            <div className="value">
                              <h1 className="ui header prime">
                                60%
                                <div className="sub header" style={{ fontSize: 12 }}>
                                  confidence
                                  <br />
                                  this device is an
                                  <br />
                                  admin. server
                                </div>
                              </h1>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <i className="bottom aligned fas fa-envelope-open-text twenty fa-4x">
                          {" "}
                        </i>
                        <div className="ui left pointing basic label">
                          <div className="ui floated statistic">
                            <div className="value">
                              <h1 className="ui header">
                                20%
                                <div className="sub header" style={{ fontSize: 12 }}>
                                  confidence
                                  <br />
                                  this device is an
                                  <br />
                                  Exchange Server
                                </div>
                              </h1>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <i className="bottom aligned fab fa-confluence twenty fa-4x">
                          {" "}
                        </i>
                        <div className="ui left pointing basic label">
                          <div className="ui floated statistic">
                            <div className="value">
                              <h1 className="ui header">
                                20%
                                <div className="sub header" style={{ fontSize: 12 }}>
                                  confidence
                                  <br />
                                  this device is a<br />
                                  Confluence server
                                </div>
                              </h1>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Device</th>
                      <th>OS</th>
                      <th>IP</th>
                      <th>MAC</th>
                      <th>Primary Label</th>
                      <th>Secondary Label</th>
                      <th>Tertiary Label</th>
                    </tr>
                  </tfoot>
                </table>
                <h2>Traffic Summary</h2>
                <div id="chart" />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
      );
	}
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps) (DeviceSummary);
