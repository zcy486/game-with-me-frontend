import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";
import PostDetails from "../../components/PostDetailsView/PostDetails";
import ScrollContainer from "../../components/ScrollContainer";
import Comments from "../../components/PostDetailsView/Comments";
import backgroundPic from "../../images/bg_postlist.png";
import MockAvatar from "../../images/avatar.svg";
import { getPost } from "../../redux/actions";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

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
  screenshots: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

function PostDetailsView(props) {
  const classes = useStyles();

  let { match } = props;

  const post = useSelector((state) => state.posts.post);

  //TODO: replace mock screenshots
  const screenshots = [
    { original: MockAvatar, originalAlt: "1" },
    { original: MockAvatar, originalAlt: "2" },
    { original: MockAvatar, originalAlt: "3" },
    { original: MockAvatar, originalAlt: "4" },
    { original: MockAvatar, originalAlt: "5" },
  ];

  const user = useSelector((state) => state.user.user)

  const [canOrder, setCanOrder] = React.useState(true);

  useEffect(() => {
    props.dispatch(getPost(match.params.postId));
  }, [match.params]);

  const clickOrder = () => {
    props.history.push(window.location.pathname + "/order");
  };


  useEffect(() => {
     
    if(user && post){ 
        if(user._id === post.companionId || window.localStorage["order"]){
            setCanOrder(false);
        }
    } else  setCanOrder(false);
  }, [user, post]);


  
  //TODO add Loading with post (useSelector) together
  return (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <PostDetails
            price={post && post.price}
            gameName={post && post.gameName}
            username={post && post.companionName}
            age={post && post.companionAge}
            introduction={post && post.introduction}
            ratings={post && post.ratings}
            served={post && post.orderNumber}
            companionType={post && post.postType}
            server={post && post.servers}
            platform={post && post.platforms}
            avatar={post && post.avatarUrl}
            availableTime={post && post.availableTime}
            clickOrder={clickOrder}
            canOrder={canOrder}
            user={user}
          />
          <GridList className={classes.gridList} cols={2.5}>
            {screenshots.map((screenshot) => (
              <GridListTile key={screenshot.original}>
                <img src={screenshot.original} alt={screenshot.originalAlt} />
              </GridListTile>
            ))}
          </GridList>
          <Comments
            numComments={post && post.reviewNumber}
            //TODO change mock data to reviews!
            labels={[
              { num: 10, name: "Carry in game" },
              { num: 5, name: "Humorous" },
              { num: 3, name: "Fast Response" },
              { num: 1, name: "Cooperative" },
            ]}
          />
        </div>
      </div>
    </ScrollContainer>
  );
}

export default connect()(PostDetailsView);
