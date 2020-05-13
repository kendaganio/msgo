import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

// import List from "./List";
import Show from "./Show";

const Contractors = (props) => {
  let { path } = useRouteMatch();

  return (
    <Route>
      <Switch>
        <Route path={`${path}/:id`}>
          <Show />
        </Route>
        <Route path={path}>lol</Route>
      </Switch>
    </Route>
  );
};

export default Contractors;
