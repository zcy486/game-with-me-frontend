import HomePageView from "./views/HomePageView";
import PostListView from "./views/PostListView";
import PostDetailsView from "./views/PostDetailsView";
import SignUpView from "./views/SignUpView";
import LoginView from "./views/LoginView";
import CreateOrderView from "./views/CreateOrderView";
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
        path: "/login",
        component: LoginView,
    },
    {
        path: "/register",
        component:SignUpView,
    },
    {
       path: "/games/:gameId/detail/:postId/order",
       component:CreateOrderView,
    },
];

export default routes;