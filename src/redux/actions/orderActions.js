import OrderService from "../../services/OrderService";


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



export function createOrder(price, postId, gamerId)
    {
    function onSuccess() {
        return { type: "CREATEORDER_SUCCESS" };
    }
    function onFailure(error) {
        console.log("create order failure", error);
    }

    return async (dispatch) => {
        try {
            let order = await OrderService.createOrder(price, postId, gamerId);
            dispatch(onSuccess(order));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function updateOrderStatus(status) {
    function onSuccess(order) {
        return { type: "UPDATESTATUS_SUCCESS", order: order };
    }

    function onFailure(error) {
        console.log("update status failure", error);
    }

    return async (dispatch) => {
        try {
            let order = await OrderService.updateStatus(status);
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
    };
}
