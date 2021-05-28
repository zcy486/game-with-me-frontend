import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GamesSelector from "../../components/PostListView/GamesSelector";
import SortSelector from "../../components/PostListView/SortSelector";
import FilterBox from "../../components/PostListView/FilterBox";
import bgPic from "../../components/Images/LOL.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  selector: {
    flexGrow: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 2,
  },
  gameTitle: {
    position: "relative",
    display: "flex",
    paddingTop: "10%",
    paddingLeft: "3%",
    paddingBottom: "6%",
    fontSize: "45px",
    fontFamily: "Helvetica",
  },
  filterscolumn: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    fontSize: "30px",
  },
  filtersRow: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    fontSize: "30px",
  },
  sortFilter: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    fontSize: "30px",
    paddingTop: "1.5%",
    paddingLeft: "30%",
  },
  sortBy: {
    marginTop: "12px",
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: "17px",
  },
}));

function PostListView() {
  const classes = useStyles();

  const allStatus = ["online", "offline", "busy", "all-status"];
  const allLanguages = [
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
  const allTypes = ["Carry", "Chill", "All types"];
  const allPrices = ["0-5", "6-10", "11-20", "20+"];
  const Servers = ["EU", "CN", "JP"];
  const Platforms = ["PC", "Nintendo"];

  return (
    <div className={classes.root}>
      <div className={classes.selector}>
        <GamesSelector />
      </div>
      <div className={classes.content}>
        <h1 className={classes.gameTitle}>League of Legends</h1>
        <div className={classes.filterscolumn}>
          <div className={classes.filtersRow}>
            <FilterBox choices={allStatus} helperText="Status"></FilterBox>
            <FilterBox choices={allLanguages} helperText="Language"></FilterBox>
            <FilterBox choices={allTypes} helperText="Type"></FilterBox>
            <FilterBox choices={allPrices} helperText="Price"></FilterBox>
            <div className={classes.sortFilter}>
              <h6 className={classes.sortBy}>sort by: </h6>
              <SortSelector />
            </div>
          </div>
          <div className={classes.filtersRow}>
          <FilterBox choices={Servers} helperText="Server"></FilterBox>
          <FilterBox choices={Platforms} helperText="Platform"></FilterBox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostListView;
