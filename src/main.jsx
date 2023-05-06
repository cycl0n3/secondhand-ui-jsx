import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";

import {ChakraProvider, ColorModeScript} from '@chakra-ui/react';

import theme from './components/theme/theme.js';

import { UserProvider } from "./components/context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
);
