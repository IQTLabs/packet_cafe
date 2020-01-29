import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';


import "index.css";
import App from "./App";
//import registerServiceWorker from "./registerServiceWorker";

import configureStore from "./configure-store";

const store = configureStore();

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

//registerServiceWorker();

if (module.hot) {
  module.hot.accept("./App", () => {
    ReactDOM.render(
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>,
      document.getElementById("root")
    );
  });
}
