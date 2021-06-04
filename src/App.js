import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import reducers from "./redux/reducers";
import routes from "./routes";
import Header from "./components/Header";
import theme from "./theming/themes";

const useStyles = makeStyles(() => ({
  appRoot: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));

function App() {
  const classes = useStyles();

  // create store for redux
  const store = createStore(reducers, applyMiddleware(thunkMiddleware));

  return (
    <div className={classes.appRoot}>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <React.Fragment>
            <Header />
            <Switch>
              {routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </React.Fragment>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
