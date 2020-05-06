import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import List from "./List";
import Edit from "./Edit";
import Show from "./Show";
import New from "./New";

const Payroll = (props) => {
  let { path } = useRouteMatch();

  return (
    <Route>
      <Switch>
        <Route path={`${path}/new`}>
          <New />
        </Route>
        <Route path={`${path}/:id/edit`}>
          <Edit />
        </Route>
        <Route path={`${path}/:id`}>
          <Show />
        </Route>
        <Route path={path}>
          <List />
        </Route>
      </Switch>
    </Route>
  );
};

export default Payroll;
