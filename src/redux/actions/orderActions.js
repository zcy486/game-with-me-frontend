import OrderService from "../../services/OrderService";



export function createOrder(price, companionId, gamerId)
    {
    function onSuccess() {
        return { type: "CREATEORDER_SUCCESS" };
    }
    function onFailure(error) {
        console.log("create order failure", error);
    }

    return async (dispatch) => {
        try {
            let order = await OrderService.createOrder(price, companionId, gamerId);
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
