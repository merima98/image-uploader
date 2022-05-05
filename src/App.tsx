import React, { useEffect, useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Session } from "@supabase/supabase-js";

import Header from "./components/header/Header";
import { LOGGED_IN_USER_ROUTES, LOGGED_OUT_USER } from "./routes";
import CollectionNavigation from "./components/header/CollectionNavigation";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <CollectionNavigation />
        <Routes>
          {!session
            ? LOGGED_OUT_USER.map((item) => {
                return (
                  <Route
                    path={item.path}
                    key={item.path}
                    element={<item.element />}
                  />
                );
              })
            : LOGGED_IN_USER_ROUTES.map((item) => {
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
