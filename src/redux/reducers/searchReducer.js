
export default function options(state = {}, action) {
    switch (action.type) {
        case "SEARCH_SUCCESS":
            return { options: action.options };
        default:
            return state;
    }
}