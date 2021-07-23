import UserService from "../../services/UserService";
import OrderService from "../../services/OrderService";

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
  function onSuccess() {
    return { type: "LOGOUT" };
  }

  function onFailure(error) {
    return { type: "LOGOUT_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      if (window.localStorage["order"]) {
        let order = JSON.parse(window.localStorage["order"]);
        let updatedOrder = await OrderService.getOrder(order._id);
        if (updatedOrder.orderStatus === "Created") {
          alert(
            "Your order has been automatically cancelled because you logout."
          );
          //delete user automatically transfer the money back to gamer account.
          await OrderService.deleteOrder(order._id);
        }
        window.localStorage.removeItem("order");
      }
      dispatch(onSuccess());
    } catch (e) {
      dispatch(onFailure(e));
    }
    UserService.logout();
  };
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

export function updateBalance(id, balance, type, amount, account) {
  function onSuccess(user) {
    return { type: "UPDATEBALANCE_SUCCESS", user: user };
  }

  function onFailure(error) {
    return { type: "UPDATEBALANCE_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      if (type === "Withdraw") {
        await UserService.withdraw(id, account, amount * 0.9);
      }
      let resp = await UserService.updateBalance(id, balance);
      await UserService.recordPayment(id, type, amount, account, null);
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function uploadImage(olduser, file) {
  function onSuccess(user) {
    return { type: "UPLOAD_SUCCESS", user: user };
  }

  function onFailure(error) {
    return { type: "UPLOADFAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.uploadImage(olduser, file);
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function deleteImage(auser) {
  function onSuccess(user) {
    return { type: "DELETE_SUCCESS", user: user };
  }

  function onFailure(error) {
    return { type: "DELETEFAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.deleteImage(auser);
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}
