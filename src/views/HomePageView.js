import React, {useEffect} from "react";
import {connect, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ScrollContainer from "../components/ScrollContainer";
import IntroBlock from "../components/HomePageView/IntroBlock";
import ThreeSteps from "../components/HomePageView/ThreeSteps";
import {getIdByName} from "../redux/actions";

import backgroundPic from "../images/bg_homepage.png";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${backgroundPic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

function HomePageView(props) {
  const classes = useStyles();

  const firstGameId = useSelector((state) => state.games.gameId);

  useEffect(() => {
    if(!firstGameId) {
      loadFirstId();
    }
  }, [firstGameId]);

  const loadFirstId = async () => {
    props.dispatch(getIdByName("League of Legends"));
  };

  const onClick = () => {
    props.history.push("/games/" + firstGameId);
  };

  return (
    <ScrollContainer>
      <div className={classes.root}>
        <IntroBlock onClick={onClick}/>
        <ThreeSteps />
      </div>
    </ScrollContainer>
  );
}

export default connect()(HomePageView);