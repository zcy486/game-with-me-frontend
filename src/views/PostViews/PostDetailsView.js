import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";
import PostDetails from "../../components/PostDetailsView/PostDetails";
import ScrollContainer from "../../components/ScrollContainer";
import Comments from "../../components/PostDetailsView/Comments";
import backgroundPic from "../../images/bg_postlist.png";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { getPost } from "../../redux/actions";

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

  const [canOrder, setCanOrder] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const post = useSelector((state) => state.posts.post);

  useEffect(() => {
    props.dispatch(getPost(match.params.postId));
  }, [match.params]);

  const clickOrder = () => {
    props.history.push(window.location.pathname + "/order");
  };

  const myPost = post && user && user._id === post.companionId;

  // Disable ordering the user himself/herself
  useEffect(() => {
    if (user && post) {
      if (user._id !== post.companionId && !window.localStorage["order"]) {
        setCanOrder(true);
      }
    }
  }, [user, post]);

  const onClickChat = (event) => {
    event.preventDefault();
    if (!user) {
      props.history.push("/login");
    } else {
      const targetID = post && post.companionId;
      const targetName = post && post.companionName;
      const gameId = post && post.gameId;
      const gameName = post && post.gameName;
      const price = post && post.price;
      const postId = post && post._id;
      if (user._id === targetID) {
        window.alert("You cannot chat to yourself!");
      } else {
        props.history.push(
          `/chat/${targetID}/${targetName}/${gameId}/${gameName}/${price}/${postId}`
        );
      }
    }
  };

  return (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <PostDetails
            post={post}
            clickOrder={clickOrder}
            canOrder={canOrder}
            user={user}
            myPost={myPost}
            clickChat={onClickChat}
          />
          <GridList className={classes.gridList} cols={2.5}>
            {post &&
              post.screenshots &&
              !post.screenshots.isEmpty &&
              Array.isArray(post.screenshots) &&
              post.screenshots.map((screenshot) => (
                <GridListTile key={screenshot}>
                  <img src={screenshot} alt={"screenshot"} />
                </GridListTile>
              ))}
          </GridList>
          <Comments
            companionId={post && post.companionId}
            numComments={post && post.reviewNumber}
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
