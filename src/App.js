import React from "react";
import routes from "./routes";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import { makeStyles } from "@material-ui/core";
import Container from "./components/Container";

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
      <React.Fragment>
        <Header />
        <Container>
          <BrowserRouter>
            <Switch>
              {routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </BrowserRouter>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
