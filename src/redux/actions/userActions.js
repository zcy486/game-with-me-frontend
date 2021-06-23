import UserService from "../../services/UserService";

export function login(username, password) {
    function onSuccess(user) {
        return { type: "LOGIN_SUCCESS", user: user };
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.login(username, password);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function logout() {
    UserService.logout();
    return { type: "LOGOUT" };
}

export function loginReset() {
    return { type: "LOGIN_RESET" };
}

export function register(username, password) {
    function onSuccess(user) {
        return { type: "LOGIN_SUCCESS", user: user };
    }
    function onFailure(error) {
        return { type: "REGISTER_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.register(username, password);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function updateProfile(updatedUser) {
    function onSuccess(user) {
        return { type: "UPDATEUSER_SUCCESS", user: user };
    }

    function onFailure(error) {
        return { type: "UPDATEUSER_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.updateProfile(updatedUser);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };

}


export function updateBalance(id, balance) {
    function onSuccess(user) {
        return { type: "UPDATEBALANCE_SUCCESS", user: user };
    }

    function onFailure(error) {
        return { type: "UPDATEBALANCE_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.updateBalance(id, balance);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}
