import React from "react";
import routes from "./routes";
import theme from "./theming/themes";

import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles(() => ({
  appRoot: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.appRoot}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <React.Fragment>
          <Header />
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </React.Fragment>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
