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

//helper var to clear timeout & interval
var timeout;
var interval;
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

            //get the latest order fron backend every 3 seconds 

            interval = setInterval(updatedOrder(gamerId, companionId, timeout, currentBalance), 3000);

          
            //if more than 30s order status still not changed, then delete the order, and clear the interval 
            timeout = setTimeout(shouldDelete(interval), 900000);

            dispatch(onSuccess());
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
            let order = await OrderService.updateStatus(id, status).order;
            dispatch(onSuccess(order));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function getOrder(id) {
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
}

//zy
export const getOrderByGamerId = (gamerId) => {
    function onSuccess(order) {
        return { type: "GETORDERBYGAMERID_SUCCESS", orderlist: order };
    }
    function onFailure(error) {
        console.log("GETORDERBYGAMERID_FAILURE", error);
    }

    return async (dispatch, getState) => {
        try {
            let order = await OrderService.getOrderByGamerId(gamerId);
            dispatch(onSuccess(order));
        } catch (e) {
            onFailure(e);
        }
    };
};


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
function shouldDelete(interval) {
    return async () => {
        clearInterval(interval);
        interval = null;
        try {
            if (window.localStorage["order"]) {

                let order = JSON.parse(window.localStorage['order']);
                let updatedOrder = await OrderService.getOrder(order._id);
                if (updatedOrder.orderStatus === "Created") {
                    alert("Your order has been automatically cancelled because companion didn't confirmed.")
                    await OrderService.deleteOrder(order._id);

                    //return the ecoin to gamer.
                    //accompished from backend

                    timeout = null;

                }
                //clear the storage anyway even if it's confirmed
                localStorage.removeItem("order");
            }

        } catch (e) {
            console.log(e);
        }
    }
}

function updatedOrder(gamerId, companionId, timeout, currentBalance) {
    return async () => {
        if (window.localStorage["order"]) {

            let order = JSON.parse(window.localStorage['order']);
            try {
                let updatedOrder = await OrderService.getOrder(order._id);
                updatedOrder.currentBalance = currentBalance;
                localStorage.setItem("order", JSON.stringify(updatedOrder));
                if (updatedOrder.orderStatus === "Confirmed") {
                    if(interval){
                        clearInterval(interval);
                        interval = null;
                    }
                    alert("Your order has been confirmed by the companion")
                    
                     // if confirmed, record the payment into our database with type "Paid"
                    await UserService.recordPayment(order.gamerId, "Paid", order.orderPrice, "self-account", order._id);
                    if (timeout) {
                        clearTimeout(timeout)
                        timeout = null;
                    }
                    if(localStorage["order"]){
                    localStorage.removeItem("order");
                    window.location.replace("/myOrders/gamerId/" + gamerId);
                    }
                    //if confirmed, increase the order number of companion
                    await UserService.updateCompanionOrder(companionId);
                   
                }

            } catch (e) {
                console.log(e);
            }

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





