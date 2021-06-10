
export default function orders(state = {}, action) {
    switch (action.type) {
        case "GETORDER_SUCCESS":
            return { order: action.order };
        case "GETORDER_FAILURE":
            return { error: action.error };

        case "CREATEORDER_SUCCESS":
            return { ...state };
        default:
            return state;
    }
}