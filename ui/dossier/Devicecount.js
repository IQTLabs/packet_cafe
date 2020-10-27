import * as React from "react";

import { Statistic, Label } from "semantic-ui-react";

const Devicecount = () => (
  <div>
    <Statistic.Group>
      <Statistic>
        <Statistic.Value>
          <Label circular size="massive" color="teal">
            156
          </Label>
        </Statistic.Value>
        <Statistic.Label>
          Devices
          <br />
          Total
        </Statistic.Label>
      </Statistic>
    </Statistic.Group>
    <Statistic.Group>
      <Statistic>
        <Statistic.Value>
          <Label size="massive">13</Label>
        </Statistic.Value>
        <Statistic.Label>
          Device
          <br />
          Types
        </Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </div>
);

export default Devicecount;
