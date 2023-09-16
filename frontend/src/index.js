import React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Header from "./components/Header";
import Checker from "./components/Checker";

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Checker />
    </ChakraProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
