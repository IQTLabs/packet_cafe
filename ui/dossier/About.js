import * as React from "react";
import { Header, Segment } from "semantic-ui-react";

const About = () => (
  <Segment
    piled
    style={{
      marginTop: "9em"
    }}
  >
    <Header as="h1">About PCAPviz</Header>
    <p>
      When monitoring network traffic, security administrators often rely on
      packet captures (PCAPs). However, existing PCAP analysis workflows are
      <a
        href="https://vimeo.com/380959986"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        not always user-friendly
      </a>
      . These tools require users to perform multiple steps before they can
      identify devices, review encryption, and explore port listening ranges.
    </p>
    <p>
      PCAPviz is different. Building on an earlier version of{" "}
      <a
        href="https://www.cyberreboot.org/projects/packet-cafe/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Packet Caf&#233;
      </a>
      , it displays network traffic data in a{" "}
      <a href="../02-PCAP-Summary/index.html">dossier</a> format which
      encourages:
    </p>
    <ul>
      <li>PCAP exploration</li>
      <li>consideration of alternate hypotheses around device roles</li>
      <li>observation of traffic clusters</li>
      <li>exploration of port listening ranges</li>
      <li>
        differentiation of encrypted, plaintext, and unknown (i.e.
        non-UDP/non-TCP) traffic
      </li>
    </ul>
    <p>
      We invite you to explore your own packet captures with PCAPviz and
      contribute to the wider{" "}
      <a
        href="https://github.com/IQTLabs/packet_cafe"
        target="_blank"
        rel="noopener noreferrer"
      >
        Packet Caf&#233;
      </a>{" "}
      project, which is available under the Apache 2.0 License.
    </p>
  </Segment>
);

export default About;
