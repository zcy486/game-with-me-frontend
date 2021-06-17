export default function posts(state = {}, action) {
    switch (action.type) {
        case "CREATEPOST_SUCCESS":
            return {...state};
        case "GETPOST_SUCCESS":
            console.log(action.post);
            return { post: action.post };
        case "GETPOSTSBYGAME_SUCCESS":
            return { response: action.response };
        default:
            return state;
    }
}