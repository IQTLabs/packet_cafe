import * as React from "react";

import { Message } from "semantic-ui-react";

const NetworkMLcontext = () => (
  <div
    style={{
      marginTop: "1em"
    }}
  >
    <Message info>
      <Message.Header>Where do these device labels come from?</Message.Header>
      <p>
        This dossier relies on{" "}
        <a
          href="https://github.com/IQTLabs/NetworkML/tree/master/networkml/trained_models"
          target="_blank"
          rel="noopener noreferrer"
        >
          NetworkML
        </a>{" "}
        to perform device role identification. The underlying machine learning
        model takes host-/session-level network traffic and infers each device's
        functional role (e.g. printer or e-mail server). To explore individual
        device details, please select a card above.
      </p>
    </Message>
  </div>
);

export default NetworkMLcontext;
