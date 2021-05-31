import { makeStyles } from "@material-ui/core/styles";
import GamesSelector from "../../components/PostListView/GamesSelector";
import FilterBox from "../../components/PostListView/FilterBox";
import PostBox from "../../components/PostListView/PostBox";
import ScrollContainer from "../../components/ScrollContainer";
import backgroundPic from "../../images/bg_postlist.png";

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

function PostListView() {
  const classes = useStyles();

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

  return (
    <div className={classes.root}>
      <div className={classes.gameSelector}>
        <GamesSelector />
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
          <PostBox username="Tom"></PostBox>
          <PostBox username="Takahashi99"></PostBox>
          <PostBox username="blabla"></PostBox>
          <PostBox username="heiheihei"></PostBox>
        </div>
      </ScrollContainer>
    </div>
  );
}

export default PostListView;
