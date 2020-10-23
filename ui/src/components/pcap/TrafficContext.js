import * as React from "react";
import { Message } from "semantic-ui-react";

const TrafficContext = () => (
  <div
    style={{
      marginTop: "1em"
    }}
  >
    <Message color="blue">
      <Message.Header>
        How does Packet Caf&#233; determine traffic encryption?
      </Message.Header>
      <p>
        The process for determining plaintext or encrypted packets involves
        tokenizing payloads into words and if any English words are found, the
        packet is marked as plaintext, otherwise it is considered encrypted.
        When a given packet cannot be parsed or is not UDP/TCP (i.e. when it
        contains ICMP, DNS, DHCP traffic), the associated traffic category is
        unknown.
      </p>
    </Message>
  </div>
);

export default TrafficContext;