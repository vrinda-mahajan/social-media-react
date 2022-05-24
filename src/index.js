import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "app/store";
import { ChakraProvider } from "@chakra-ui/react";
import {customTheme,theme} from "styles/theme"
// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={customTheme} initialColorMode={theme.config.initialColorMode}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
