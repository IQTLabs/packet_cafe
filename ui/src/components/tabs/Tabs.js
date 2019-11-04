import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Tabs.css';

class TabsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.characters = {
      "File Info": { color: "LightGrey", text: "black", desc: "Here's some information about the file you uploaded." },
      "Basic Info": { color: "LightGrey", text: "black", desc: "" }
    };

    this.state = {
      "File Info": true,
      "Basic Info": true
    };

    this.handleCheckClicked = this.handleCheckClicked.bind(this);
  }

  handleCheckClicked(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  render() {
    const links = [];
    const tabs = [];
    const tabPanels = [];

    Object.keys(this.characters).forEach(name => {
      links.push(
        <label key={name}>
          <input
            type="checkbox"
            checked={this.state[name]}
            name={name}
            onChange={this.handleCheckClicked}
          />
          {name}&nbsp;&nbsp;
        </label>
      );

      if (!this.state[name]) return;

      const { color: backgroundColor, text: color, desc } = this.characters[name];

      tabs.push(
        <Tab style={{ backgroundColor }} className="tools-tab" key={name}>
          <p>{name}</p>
        </Tab>
      );

      tabPanels.push(
        <TabPanel style={{ backgroundColor, color }} className="tools-tab-panel" key={name}>
          {desc}
        </TabPanel>
      );
    });

    return (
      <div>
        <p>{links}</p>
        <Tabs
          selectedTabClassName="tools-tab--selected"
          selectedTabPanelClassName="tools-tab-panel--selected"
        >
          <TabList className="tools-tab-list">{tabs}</TabList>
          {tabPanels}
        </Tabs>
      </div>
    );
  }
}

export default TabsComponent
