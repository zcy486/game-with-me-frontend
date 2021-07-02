export default function posts(state = {}, action) {
    switch (action.type) {
        case "CREATEPOST_SUCCESS":
            return {...state};
        case "GETPOST_SUCCESS":
            return { post: action.post };
        case "GETPOSTSWITHFILTERS_SUCCESS":
            return { response: action.response };
        case "COMPANIONPOST":
            return { companion: action.companion };
        default:
            return state;
    }
}