import React from 'react'
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import notFoundImg from "../images/oops.png";
import backgroundPic from "../images/bg_postlist.png";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        background: `url(${backgroundPic})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        height: "100%",
    },
    content: {
        width: 1500,
        textAlign: "left",
        paddingTop: theme.spacing(12),
        paddingLeft: theme.spacing(30),
        paddingRight: theme.spacing(30),
        paddingBottom: theme.spacing(10),
    },
    notFoundImg: {
        marginTop: theme.spacing(5),
        maxWidth: "250px",
        maxHeight: "250px",
    },
    notFound: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },

    notFoundTitle: {
        fontSize: "xx-large",
        fontFamily: "Helvetica",
        fontWeight: "bolder",
        color: "#8271DD",
        marginBottom: "0",
    },
}));



function PageNotFound(props) {
    const classes = useStyles();
    
    const onClick = () => {
        props.history.push("/");
}

    return (
      
        <div className={classes.root}>

            <div className={classes.content}>
                <div className={classes.notFound}>
                    <img
                        src={notFoundImg}
                        className={classes.notFoundImg}
                    />
                
                <div className={classes.notFoundTitle}>This page could not be found.</div>
                <Button variant={"contained"} color={"secondary"} onClick={onClick}> Homepage</Button>
              </div>
            </div>
        </div >
    )
}

export default PageNotFound