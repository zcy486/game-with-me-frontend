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
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import OrderService from "../src/services/OrderService";

const useStyles = makeStyles(() => ({
    appRoot: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(15),
        right: theme.spacing(15),
    },

}));

function App() {
    const classes = useStyles();

    // create store for redux
    const store = createStore(reducers, applyMiddleware(thunkMiddleware));

    const waitedOrder = store.getState().order

    //console.log(waitedOrder.order);

    const cancel = async () => {
        try {
            await OrderService.deleteOrder(waitedOrder.order._id);
            window.localStorage.removeItem("order");
            window.location.reload();

        } catch (e) {
            console.log(e);
        }
    }


    const hasOrder = (Object.keys(waitedOrder).length !== 0);
    //console.log(hasOrder)
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
                        {hasOrder ?
                            <Fab variant="extended" className={classes.fab} color={"secondary"} onClick={cancel}>
                                <CancelIcon/>
                                Cancel current order
                            </Fab> : null}
                    </React.Fragment>
                </Provider>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
