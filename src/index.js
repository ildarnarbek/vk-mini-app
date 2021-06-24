import React from "react";
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

import store from './store';

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
