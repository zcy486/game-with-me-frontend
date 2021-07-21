import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ScrollContainer from "../components/ScrollContainer";
import IntroBlock from "../components/HomePageView/IntroBlock";
import ThreeSteps from "../components/HomePageView/ThreeSteps";

import backgroundPic from "../images/bg_homepage.png";
import GameService from "../services/GameService";

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

  let firstGameId = useSelector((state) => state.games.gameId);

  // Get the game with most posts
  useEffect(() => {
    (async () => {
      let response = await GameService.getMostPopularGame();
      firstGameId = response.gameId
    })();
  }, [firstGameId]);

  const onClick = () => {
    if (firstGameId) {
      props.history.push("/games/" + firstGameId);
    }
  };

  return (
    <ScrollContainer>
      <div className={classes.root}>
        <IntroBlock onClick={onClick} />
        <ThreeSteps />
      </div>
    </ScrollContainer>
  );
}

export default connect()(HomePageView);
