import HomePageView from "./views/HomePageView";
import PostListView from "./views/PostListView";
import PostDetailsView from "./views/PostDetailsView";
import SignUpView from "./views/SignUpView";
import UserLoginView from "./views/UserLoginView";

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
        component: UserLoginView,
    },
    {
        path: "/register",
        component:SignUpView,
    },
];

export default routes;