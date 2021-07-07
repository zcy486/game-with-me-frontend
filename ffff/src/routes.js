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
import CreateReviewView from "./views/CreateReviewView";
import MyOrderDetailView from "./views/MyOrderDetailView";
import OrderListView from "./views/OrderListView";
import CompanionOrderView from "./views/CompanionOrderView";

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
    path:'/createpost',
    component: CreatePostView,
  },
/*   { 
    path: "/orderDetails/review",
    component:CreateReviewView,
  },
  {
    path: "/orderDetails/:orderId",
    component:MyOrderDetailView,
  }, */
  {
    path: "/chat",
    component: ChatView,
  },
  {
    path: "/orderDetails/review/:orderId",
    component:CreateReviewView,
},
{
    path: "/myOrders/gamerId/:gamerId/details/:orderId",
    component:MyOrderDetailView,
},
{
    path: "/myOrders/gamerId/:gamerId",
    component:OrderListView,
},
 {   path: "/companionorder/:companionId",
    component: CompanionOrderView,
    exact: true,
  },
];

export default routes;
