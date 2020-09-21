import React from "react";
import { Icon, Menu } from "semantic-ui-react";

const Devicetablepaging = () => (
  <Menu floated="right" pagination>
    <Menu.Item disabled as="a" icon>
      <Icon name="chevron right" />
    </Menu.Item>
    <Menu.Item as="a">1</Menu.Item>
    <Menu.Item disabled as="a">
      2
    </Menu.Item>
    <Menu.Item disabled as="a">
      3
    </Menu.Item>
    <Menu.Item disabled as="a">
      4
    </Menu.Item>
    <Menu.Item disabled as="a" icon>
      <Icon name="chevron left" />
    </Menu.Item>
  </Menu>
);

export default Devicetablepaging;
