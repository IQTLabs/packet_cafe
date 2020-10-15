import * as React from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { Statistic, Label } from "semantic-ui-react";

const deviceGroupModelForFile = createSelector(
  state => state.data.deviceGroupModel,
  (_, fileId) => fileId,
  (deviceTableModel, fileId,) => deviceTableModel[fileId]|| {}
)

const DeviceCount = (props) => {
    const dgm = useSelector(state => deviceGroupModelForFile(state, props.fileId));
    console.log("dgm: %o", dgm);
    const deviceCount = Object.keys(dgm).reduce((total, key) => {
        console.log("dgm[key]: %o", dgm[key]);
        return total += dgm[key]["count"]
    }, 0);
    const groupCount = Object.keys(dgm).filter((key) => dgm[key]["count"] > 0).length;
    console.log("deviceCount: %o", deviceCount);
    console.log("groupCount: %o", groupCount);
    return(
      <div>
        <Statistic.Group>
          <Statistic>
            <Statistic.Value>
              <Label circular size="massive" color="teal">
                {deviceCount}
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
              <Label size="massive">{groupCount}</Label>
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
};

export default DeviceCount;
