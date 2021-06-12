export default function posts(state = {}, action) {
    switch (action.type) {
        case "CREATEPOST_SUCCESS":
            return {...state};
        default:
            return state;
    }
}