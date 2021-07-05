import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { connect, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import ScrollContainer from "../components/ScrollContainer";
import backgroundPic from "../images/bg_postlist.png";
import MockAvatar from "../images/avatar.svg";
import CompanionOrderBox from "../components/CompanionOrderView/CompanionOrderBox";
import { getCompanionOrders, updateCompanionOrders } from "../redux/actions";
import noOrderImage from "../images/oops.png";

const useStyles = makeStyles((theme) => ({

    root: {
        display: "flex",
        backgroundImage: `url(${backgroundPic})`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        justifyContent: "center",
        alignItems: "center",

    },

    content: {
        width: 1500,
        textAlign: "left",
        paddingTop: theme.spacing(12),
        paddingLeft: theme.spacing(30),
        paddingRight: theme.spacing(30),
        paddingBottom: theme.spacing(10),

    },
    pageTitle: {
        fontSize: "40px",
        fontFamily: "Helvetica",
        paddingBottom: theme.spacing(8),
    },
    placeHolder: {
        flexGrow: 1,
    },
    noOrder: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },

    noOrderTitle: {
        fontSize: "xx-large",
        fontFamily: "Helvetica",
        fontWeight: "bolder",
        color: "#8271DD",
        marginBottom: "0",
    },

    noOrderImage: {
        marginTop: theme.spacing(5),
        maxWidth: "250px",
        maxHeight: "250px",
    },
    panination: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(10),
    },
}));

function CompanionOrderView(props) {
    const classes = useStyles();

    let { match } = props;

    const orders = useSelector((state) => state.order.companionorders);

    const [page, setPage] = React.useState(1);

    useEffect(() => {
        props.dispatch(getCompanionOrders(match.params.companionId));
    }, [match.params]);

    const onClickComplete = (id) => {
        props.dispatch(updateCompanionOrders(id, "CompletedByCompanion", match.params.companionId));
    }

    const onClickConfirm = (id) => {
        props.dispatch(updateCompanionOrders(id, "Confirmed", match.params.companionId));
    }

    const onChangePage = (event, page) => {
        setPage(page);
    };

    const onClickRefresh = () =>{
        window.location.reload();
    }

    return (

        <ScrollContainer>
            <div className={classes.root}>

                <div className={classes.content}>
                    <div className={classes.pageTitle}>
                        My companion order
                    </div>
                    {orders &&
                        orders.orders.sort((a, b) => true ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                        ?
                        orders.orders.slice((page - 1) * 3, page * 3).map((order, i) => {
                            return (
                                <CompanionOrderBox
                                    order={order}
                                    gamerName={order.gamerName}
                                    gameName={order.gameName}
                                    price={order.orderPrice}
                                    dateTime={order.createdAt}
                                    status={order.orderStatus}
                                    gameNumber={order.gameNumber}
                                    avatar={order.gamerAvatarUrl ? order.gamerAvatarUrl : MockAvatar}
                                    onClickConfirm={onClickConfirm}
                                    onClickComplete={onClickComplete}
                                />
                            )
                        }) : null}
                    {orders && orders.orders.length !== 0 ? (
                        <Pagination className={classes.panination}
                            count={Math.ceil(orders ? orders.orders.length / 3 : 0)}
                            shape="rounded"
                            color="secondary"
                            onChange={onChangePage}
                        />
                    ) : (
                        <div className={classes.noOrder}>
                            <img
                                src={noOrderImage}
                                className={classes.noOrderImage}
                            />
                            <div className={classes.noOrderTitle}>No orders here yet</div>
                            <Button variant={"contained"} color={"secondary"} onClick={onClickRefresh}> Refresh page</Button>
                        </div>
                    )}
                </div>
            </div>

        </ScrollContainer>

    );

}

export default connect()(CompanionOrderView);
