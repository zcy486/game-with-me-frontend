const getOrder = () => {
    if (window.localStorage["order"]) {
        let orderJson = JSON.parse(window.localStorage.getItem("order"));
        // if 15 mins later than createdtime, order is deleted and return {}
        let createTime = orderJson.createdAt;
        let expireTime = Date.parse(createTime) + 900000
        if (expireTime < Date.now()) {
            window.localStorage.removeItem("order");
            return {};
        }
        return {
            order: {
                _id: orderJson._id,
            },
        };
    }
    return {};
};


export default function orders(state = getOrder(), action) {
    switch (action.type) {
        //this case not used
        case "GETORDER_SUCCESS":
            return { order: action.order };
        case "GETORDER_FAILURE":
            return { error: action.error };
        case "CREATEORDER_SUCCESS":
            return { order: action.order };
        case "COMPANIONORDERS":
            return { companionorders: action.companionorders };
        default:
            return state;
    }
}