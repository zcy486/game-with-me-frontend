import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import ScrollContainer from "../../components/ScrollContainer";
import backgroundPic from "../../images/bg_postlist.png";
import Loading from "../../components/Loading";

import EditPostPage from "../../components/EditPostPage";
import PostService from "../../services/PostService";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${backgroundPic})`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    pageArea: {
        paddingTop: theme.spacing(12),
        paddingLeft: theme.spacing(30),
        paddingRight: theme.spacing(30),
        paddingBottom: theme.spacing(10),
    },
    alert: {
        fontFamily: "Helvetica",
        fontWeight: "bolder",
    },
}));

function EditPostView(props) {
    const classes = useStyles();

    const user = useSelector((state) => state.user.user);

    const onCancel = () => {
        if (user) {
            let route = "/posts/" + user._id;
            props.history.push(route);
        }
    };

    const onCreate = (post) => {
        (async () => {
            console.log("send post to backend: ", post);
            const updated = await PostService.updatePost(post);
            if (user && updated) {
                props.history.push(`/posts/${user._id}`);
            }
        })();
    };

    return user ? (
        <ScrollContainer>
            <div className={classes.root}>
                <div className={classes.pageArea}>
                    <h1>Edit Your Post</h1>
                    <EditPostPage
                        user={user}
                        onCancel={onCancel}
                        onCreate={onCreate}
                    />
                </div>
            </div>
        </ScrollContainer>
    ) : (
        <Loading />
    );
}

export default connect()(EditPostView);
