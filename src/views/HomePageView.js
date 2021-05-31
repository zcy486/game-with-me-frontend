import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ScrollContainer from "../components/ScrollContainer";
import IntroBlock from "../components/HomePageView/IntroBlock";
import ThreeSteps from "../components/HomePageView/ThreeSteps";

import backgroundPic from "../images/bg_homepage.png";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${backgroundPic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

function HomePageView() {
  const classes = useStyles();

  return (
    <ScrollContainer>
      <div className={classes.root}>
        <IntroBlock />
        <ThreeSteps />
      </div>
    </ScrollContainer>
  );
}

export default HomePageView;
