import HomePageView from "./views/HomePageView";
import PostListView from "./views/PostViews/PostListView";
import CompanionPostView from "./views/PostViews/CompanionPostView";
import PostDetailsView from "./views/PostViews/PostDetailsView";
import SignUpView from "./views/UserViews/SignUpView";
import LoginView from "./views/UserViews/LoginView";
import CreateOrderView from "./views/CreateOrderView";
import ProfileView from "./views/UserViews/ProfileView";
import CreatePostView from "./views/PostViews/CreatePostView";
import ChatView from "./views/ChatViews/ChatView";
import CompanionOrderView from "./views/CompanionOrderView";
import MyPostsView from "./views/PostViews/MyPostsView";

const routes = [
  {
    path: "/",
    component: HomePageView,
    exact: true,
  },
  {
    path: "/games/:gameId",
    component: PostListView,
    exact: true,
  },
  {
    path: "/games/:gameId/detail/:postId",
    component: PostDetailsView,
    exact: true,
  },
  {
    path: "/games/:gameId/detail/:postId/order",
    component: CreateOrderView,
    exact: true,
  },
  {
    path: "/companion/:companionId",
    component: CompanionPostView,
    exact: true,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/register",
    component: SignUpView,
  },
  {
    path: "/profile",
    component: ProfileView,
  },
  {
    path: "/createpost",
    component: CreatePostView,
  },
  {
    path: "/chat",
    component: ChatView,
    exact: true,
  },
  {
    path: "/chat/:targetID/:targetName",
    component: ChatView,
    exact: true,
  },
  {
    path: "/chat/:targetID/:targetName/:gameId/:gameName/:price/:postId",
    component: ChatView,
    exact: true,
  },
  {
    path: "/companionorder/:companionId",
    component: CompanionOrderView,
    exact: true,
  },
  {
    path: "/posts/:userId",
    component: MyPostsView,
    exact: true,
  }
];

export default routes;
