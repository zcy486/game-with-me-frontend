import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import ScrollContainer from "../components/ScrollContainer";
import backgroundPic from "../images/bg_postlist.png";
import OrderBox from "../components/CreateOrderView/OrderBox";
import CompanionBox from "../components/CreateOrderView/CompanionBox";
import { createOrder } from "../redux/actions";
import { connect, useSelector } from "react-redux";
import { getPost } from "../redux/actions";
import RechargePage from "../components/CreateOrderView/RechargePage";
import { updateBalance } from "../redux/actions";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${backgroundPic})`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
    },
    pageArea: {
        paddingTop: theme.spacing(12),
        paddingLeft: theme.spacing(30),
        paddingRight: theme.spacing(30),
        paddingBottom: theme.spacing(10),
    },
}));

function CreateOrderView(props) {
    const classes = useStyles();
    const user = useSelector((state) => state.user.user);
    const order = useSelector((state) => state.order.order);
    const post = useSelector((state) => state.posts.post)


    let { match } = props;

    useEffect(() => {
        props.dispatch(getPost(match.params.postId));
    }, [match.params.postId]);


    const onConfirm = (price, postId, gamerId) => {
        props.dispatch(createOrder(price, postId, gamerId));
        //TODO: change that to my order page!
        props.history.push("/");
    };

    const onRecharge = () => {
        handleClickOpen();
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

   
    const handleRecharge = (amount) => {
        props.dispatch(updateBalance(user, amount));

    };


    const onCancel = () => {
        props.history.push(window.location.pathname.replace("/order", ""));
    };

    //TODO add Loading with user/order (useSelector) together
    return (
        <ScrollContainer>
            <div className={classes.root}>
                <div className={classes.pageArea}>
                    <h1>Order Details</h1>
                    
                    {open ? (<RechargePage
                        open={open}
                        handleClose={handleClose}
                        handleRecharge= {handleRecharge}
                    ></RechargePage>) : null}
                    <OrderBox
                        post={post}
                        gameName={post && post.gameName}
                        order={order}
                        user={user}
                        price={post && post.price}
                        onConfirm={onConfirm}
                        onCancel={onCancel}
                        onRecharge={onRecharge}
                    />

                    <h1>Information about Gaming Companion</h1>
                    <CompanionBox
                        username={post && post.companionName}
                        age={post && post.companionAge}
                        introduction={post && post.introduction}
                        price={post && post.price}
                        server={post && post.servers}
                        platform={post && post.platforms}
                    />
                </div>
            </div>
        </ScrollContainer>
    );
}

export default connect()(CreateOrderView);
