import * as React from "react";
import { render } from "react-dom";
import Navbar from "./Navbar";
import Dossier from "./Dossier";
import Footer from "./Footer";
//import About from "./About";
import "semantic-ui-react/package.json";

const App = () => (
  <div>
    <Navbar />
    <Dossier />
    <Footer />
  </div>
);

render(<App />, document.getElementById("root"));

// <About />
