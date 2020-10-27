import * as React from "react";
import { Container, Image, Segment } from "semantic-ui-react";

const Footer = () => (
  <div>
    <Segment
      inverted
      vertical
      style={{ margin: "2em 0em 0em", padding: "1em 0em" }}
    >
      <Container textAlign="center">
        <Image
          centered
          size="medium"
          src="https://res.cloudinary.com/dzu5qhcon/image/upload/v1596646275/logo/IQT_Labs_Logo_white.svg"
        />
        <p>&#169; 2020 IQT Labs, LLC</p>
      </Container>
    </Segment>
  </div>
);

export default Footer;
