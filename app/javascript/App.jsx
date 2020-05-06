import React from "react";
import { Box } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Unauntheticated from "./Unauthenticated";
import Attendance from "./screens/Attendance";
import Contractors from "./screens/Contractor";
import Payroll from "./screens/Payroll";
import { useUser } from "./contexts/UserContext";

const App = (props) => {
  const user = useUser();

  return (
    <Box bg="gray.100" minH="100vh">
      {user ? (
        <Router>
          <Header />
          <Switch>
            <Route path="/contractors">
              <Contractors />
            </Route>
            <Route path="/attendances">
              <Attendance />
            </Route>
            <Route path="/payrolls">
              <Payroll />
            </Route>
            <Route path="/">Dash</Route>
          </Switch>
          {false && <Footer />}
        </Router>
      ) : (
        <Unauntheticated />
      )}
    </Box>
  );
};

export default App;
