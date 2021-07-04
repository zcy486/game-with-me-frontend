import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { connect, useSelector } from "react-redux";

import ScrollContainer from "../components/ScrollContainer";
import backgroundPic from "../images/bg_postlist.png";
import MockAvatar from "../images/avatar.svg";
import CompanionOrderBox from "../components/CompanionOrderView/CompanionOrderBox";
import { getCompanionOrders } from "../redux/actions";

const useStyles = makeStyles((theme) => ({

    root: {
        display: "flex",
        backgroundImage: `url(${backgroundPic})`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
    },


    content: {
        width: 1000,
        textAlign: "left",
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),

    },
    pageTitle: {
        fontSize: "40px",
        fontFamily: "Helvetica",
    },
    placeHolder: {
        flexGrow: 1,
    },
    noPost: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },

    noPostTitle: {
        fontSize: "xx-large",
        fontFamily: "Helvetica",
        fontWeight: "bolder",
        color: "#8271DD",
        marginBottom: "0",
    },
}));

function CompanionOrderView(props) {
    const classes = useStyles();

    let { match } = props;

    const orders = useSelector((state) => state.order.companionorders);


    useEffect(() => {
        props.dispatch(getCompanionOrders(match.params.companionId));
    }, [match.params]);


    return (

        <ScrollContainer>
            <div className={classes.root}>

                <div className={classes.content}>
                    <div className={classes.pageTitle}>
                        My companion order
                    </div>
                    {orders &&
                        orders.orders.map((order, i) => {
                            return (
                                <CompanionOrderBox
                                    key={i}
                                    gamerName={order.gamerName}
                                    gameName={order.gameName}
                                    price={order.orderPrice}
                                    dateTime={order.createdAt}
                                    status={order.orderStatus}
                                    gameNumber = {order.gameNumber}
                                    avatar={order.gamerAvatarUrl? order.gamerAvatarUrl: MockAvatar}
                                />
                            );
                        })}
                </div>
            </div>

        </ScrollContainer>

    );

}

export default connect()(CompanionOrderView);
