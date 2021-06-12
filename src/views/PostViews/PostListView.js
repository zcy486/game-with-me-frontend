import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import GamesSelector from "../../components/PostListView/GamesSelector";
import FilterBox from "../../components/PostListView/FilterBox";
import PostBox from "../../components/PostListView/PostBox";
import ScrollContainer from "../../components/ScrollContainer";
import backgroundPic from "../../images/bg_postlist.png";
import MockAvatar from "../../images/avatar.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    background: `url(${backgroundPic})`,
    backgroundRepeat: "repeat",
  },
  gameSelector: {
    paddingRight: theme.spacing(4),
  },
  content: {
    textAlign: "right",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  gameTitle: {
    fontSize: "40px",
    fontFamily: "Helvetica",
  },
  filtersRow: {
    display: "flex",
    flexDirection: "row",
  },
  placeHolder: {
    flexGrow: 1,
  },
}));

function PostListView(props) {
  const classes = useStyles();

  const games = useSelector((state) => state.games.games);

  const allStatus = ["None", "Online", "Offline", "Busy", "All-status"];
  const allLanguages = [
    "None",
    "Deutsch",
    "English",
    "Español",
    "Français",
    "한국어",
    "Italiano",
    "日本語",
    "Português",
    "Svenska",
    "Türkçe",
    "Tiếng Việt",
    "中文",
  ];
  const allTypes = ["None", "Carry", "Chill", "All types"];
  const allPrices = ["None", "0-5", "6-10", "11-20", "20+"];
  const Servers = ["None", "EU", "CN", "JP"];
  const Platforms = ["None", "PC", "Nintendo"];
  const sortBy = ["order", "ratings"];

  useEffect(() => {
    if(!games) {
      loadGames();
    }
  }, [games]);

  const loadGames = async () => {
    props.dispatch(getGames());
  };

  return (
    <div className={classes.root}>
      <div className={classes.gameSelector}>
        <GamesSelector games={games}/>
      </div>
      <ScrollContainer>
        <div className={classes.content}>
          <h1 className={classes.gameTitle}>League of Legends</h1>
          <div className={classes.filtersRow}>
            <FilterBox choices={allStatus} helperText="Status" />
            <FilterBox choices={allLanguages} helperText="Language" />
            <FilterBox choices={allTypes} helperText="Type" />
            <FilterBox choices={allPrices} helperText="Price" />
            <FilterBox choices={Servers} helperText="Server" />
            <FilterBox choices={Platforms} helperText="Platform" />
            <div className={classes.placeHolder} />
            <FilterBox choices={sortBy} helperText="Sort by:" />
          </div>
          <PostBox username="Tom" price={5} rating={2.85} languages={["Español", "English"]} avatar={MockAvatar}/>
          <PostBox username="Takahashi99" price={2} rating={3.5} languages={["日本語", "Deutsch", "English"]} avatar={MockAvatar}/>
          <PostBox username="blabla" price={3} rating={4.4} languages={["Italiano", "Deutsch"]} avatar={MockAvatar}/>
          <PostBox username="heiheihei" price={4} rating={4.9} languages={["English", "中文"]} avatar={MockAvatar}/>
        </div>
      </ScrollContainer>
    </div>
  );
}

export default connect()(PostListView);
