export default function posts(state = {}, action) {
    switch (action.type) {
        case "CREATEPOST_SUCCESS":
            return {...state};
        case "GETPOSTSBYGAME_SUCCESS":
            return { response: action.response };
        default:
            return state;
    }
}