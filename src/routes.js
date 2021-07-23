import HomePageView from "./views/HomePageView";
import PostListView from "./views/PostViews/PostListView";
import CompanionPostView from "./views/PostViews/CompanionPostView";
import PostDetailsView from "./views/PostViews/PostDetailsView";
import SignUpView from "./views/UserViews/SignUpView";
import LoginView from "./views/UserViews/LoginView";
import CreateOrderView from "./views/OrderViews/CreateOrderView";
import ProfileView from "./views/UserViews/ProfileView";
import CreatePostView from "./views/PostViews/CreatePostView";
import ChatView from "./views/ChatViews/ChatView";
import CreateReviewView from "./views/CreateReviewView";
import MyOrderDetailView from "./views/OrderViews/MyOrderDetailView";
import OrderListView from "./views/OrderViews/OrderListView";
import CompanionOrderView from "./views/OrderViews/CompanionOrderView";
import MyPostsView from "./views/PostViews/MyPostsView";
import EditPostView from "./views/PostViews/EditPostView";

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
    path: "/editpost/:postId",
    component: EditPostView,
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
    path: "/orderDetails/review/:orderId/:companionId",
    component: CreateReviewView,
  },
  {
    path: "/myOrders/gamerId/:gamerId/details/:orderId",
    component: MyOrderDetailView,
  },
  {
    path: "/myOrders/gamerId/:gamerId",
    component: OrderListView,
  },
  {
    path: "/companionorder/:companionId",
    component: CompanionOrderView,
    exact: true,
  },
  {
    path: "/posts/:companionId",
    component: MyPostsView,
    exact: true,
  },
];

export default routes;
