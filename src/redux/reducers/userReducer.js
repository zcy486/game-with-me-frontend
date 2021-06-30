const getUser = () => {
    if (window.localStorage["jwtToken"]) {
        let token = window.localStorage["jwtToken"];
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace("-", "+").replace("_", "/");
        let userJson = JSON.parse(window.atob(base64));
        // if token is expired delete it and return {}
        // --> User is not logged in anymore.
        if (userJson.exp * 1000 < Date.now()) {
            window.localStorage.removeItem("jwtToken");
            return {};
        }
        return {
            user: {
                _id: userJson._id,
                username: userJson.username,
                age: userJson.age,
                gender: userJson.gender,
                isPremium: userJson.isPremium,
                balance: userJson.balance,
                avatarUrl: userJson.avatarUrl,
            },
        };
    }
    return {};
};

export default function user(state = getUser(), action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { user: action.user };
        case "LOGIN_FAILURE":
            return { error: "Password or username incorrect." };
        case "REGISTER_FAILURE":
            return { error: "Username has already been taken." };
        case "UPDATEUSER_SUCCESS":
            return { user: action.user.user }; 
        case "UPLOAD_SUCCESS":
            return {user: action.user.user};
        case "DELETE_SUCCESS":
            return {user: action.user.user};
        case "LOGIN_RESET":
            return {};
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}