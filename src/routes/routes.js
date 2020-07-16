import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ErrorScreen, HomeScreen } from "../screens";
import { Strings } from "../constants";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={Strings.APPLICATION.ROUTES.HOME}
          exact
          component={HomeScreen}
        />
        <Route path={Strings.APPLICATION.ROUTES.ALL} component={ErrorScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
