import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import { LOGGED_OUT_USER } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {LOGGED_OUT_USER.map((item) => {
            return (
              <Route
                path={item.path}
                key={item.path}
                element={<item.element />}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
