import OrderService from "../../services/OrderService";
import UserService from "../../services/UserService";


export function getOrders() {
    // when the backend call was successfull and the Orders are retrieved
    // in the dispatcher the Orders will be added to the global state
    function onSuccess(orders) {
        return { type: "GETORDERS_SUCCESS", orders: orders };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log("failed to get the orders", error);
    }

    return async (dispatch) => {
        try {
            // ask for the Orders in the backend
            let orders = await OrderService.getOrders();
            // call onSuccess in context of redux
            dispatch(onSuccess(orders));
        } catch (e) {
            onFailure(e);
        }
    };
}



export function createOrder(price, gamerId, postId, companionId, currentBalance) {
    function onSuccess(order) {
        return { type: "CREATEORDER_SUCCESS", order: order };
    }
    function onFailure(error) {
        console.log("create order failure", error);
    }

    return async (dispatch) => {
        try {
            let order = await OrderService.createOrder(price, gamerId, postId, companionId);
            await UserService.updateBalance(gamerId, (currentBalance - price));

            //Store the TO-BE-UPDATED order in the localStorage 
            localStorage.setItem("order", JSON.stringify(order));

            //get the latest order fron backend every 5 seconds 
            let interval = setInterval(updatedOrder(order._id),5000);

            //if more than 20s order status still not changed, then delete the order, and clear the interval 
            setTimeout(shouldDelete(order._id, interval, gamerId, currentBalance), 20000);
            dispatch(onSuccess(order));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function updateOrderStatus(id, status) {
    function onSuccess(order) {
        return { type: "UPDATESTATUS_SUCCESS", order: order };
    }

    function onFailure(error) {
        console.log("update status failure", error);
    }

    return async (dispatch) => {
        try {
            let order = await OrderService.updateStatus(id, status);
            dispatch(onSuccess(order));
        } catch (e) {
            onFailure(e);
        }
    };
}

export const getOrder = (id) => {
    function onSuccess(order) {
        return { type: "GETORDER_SUCCESS", order: order };
    }
    function onFailure(error) {
        console.log("GETORDER_FAILURE", error);
    }

    return async (dispatch, getState) => {
        try {
            let order = await OrderService.getOrder(id);
            dispatch(onSuccess(order));
        } catch (e) {
            onFailure(e);
        }
    };
};

// changed for order
export function deleteOrder(id) {
    function onSuccess(orders) {
        return { type: "DELETEORDER_SUCCESS", orders: orders };
    }
    function onFailure(error) {
        console.log("delete order failure", error);
    }
    return async (dispatch) => {
        try {
            await OrderService.deleteOrder(id);
            let orders = await OrderService.getOrders();
            dispatch(onSuccess(orders));
        } catch (e) {
            onFailure(e);
        }


    }
};

//helper function
function shouldDelete(id, interval, gamerId, currentBalance) {
    return async () => {
        try {
            if (window.localStorage["order"]) {
                clearInterval(interval);
                let order = await OrderService.getOrder(id);
                if (order.orderStatus === "Created") {
                    alert("Your order has been automatically cancelled because companion didn't confirmed.")
                    await OrderService.deleteOrder(id);

                    //return the ecoin to gamer.
                    await UserService.updateBalance(gamerId, currentBalance);

                }
                if (order.orderStatus === "Confirmed") {
                    alert("Your order has been confirmed by the companion")
                }
                //clear the storage anyway even if it's confirmed
                localStorage.removeItem("order");
            }

        } catch (e) {
            console.log(e);
        }
    }
}

function updatedOrder(id) {
    return async () => {
        try { 
            if (window.localStorage["order"]) {
            let order = await OrderService.getOrder(id);
            localStorage.setItem("order", JSON.stringify(order));
            }

        } catch (e) {
            console.log(e);
        }
    }
}



export const getCompanionOrders = (id) => {
    function onSuccess(companionorders) {
        return { type: "COMPANIONORDERS", companionorders: companionorders };
    }
    function onFailure(error) {
        console.log("GETORDER_FAILURE", error);
    }

    return async (dispatch, getState) => {
        try {
            let orders = await OrderService.getCompanionOrders(id);
            dispatch(onSuccess(orders));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateCompanionOrders = (orderId, status, id) => {
    function onSuccess(companionorders) {
        return { type: "COMPANIONORDERS_CHANGED", companionorders: companionorders };
    }
    function onFailure(error) {
        console.log("GETORDER_FAILURE", error);
    }

    return async (dispatch, getState) => {
        try {
            await OrderService.updateStatus(orderId, status);
            let orders = await OrderService.getCompanionOrders(id);
            dispatch(onSuccess(orders));
        } catch (e) {
            onFailure(e);
        }
    };
};





