import HomePageView from "./views/HomePageView";
import PostListView from "./views/PostViews/PostListView";
import PostDetailsView from "./views/PostViews/PostDetailsView";
import SignUpView from "./views/SignUpView";
import LoginView from "./views/LoginView";
import CreateReviewView from "./views/CreateReviewView";
import MyOrderDetailView from "./views/MyOrderDetailView";
//import MyOrdersView from "./views/MyOrdersView";
import OrderListView from "./views/OrderListView";
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
    },
    {
        path: "/login",
        component: LoginView,
    },
    {
        path: "/register",
        component:SignUpView,
    },
    {
        path: "/review",
        component:CreateReviewView,
    },
    {
        path: "/orderDetails",
        component:MyOrderDetailView,
    },
    {
        path: "/myorders",
        component:OrderListView,
    },
];

export default routes;